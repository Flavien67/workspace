<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\TToken;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;


use Ripoo\OdooClient;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;



use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Csrf\TokenGenerator\TokenGeneratorInterface;


class CustomController extends AbstractController
{

    private $client;

    public function __construct() {
        $this->client = new OdooClient($this->getParameter('host'), $this->getParameter('db'), $this->getParameter('defaultUser'), $this->getParameter('defaultPassword'));
        
    }
    

    /**
    * @Route("/products", name="get_all_products", methods={"GET"})
    * use default user to request products in odoo data base from API Odoo
    */
    public function getProducts() : JsonResponse
    {
            // first request to load differents template of products (versions)
            $data = $this->client->search_read('product.template',[],array(
                'name', 
                'image_1920', 
                'description_sale',
                // 'default_code',
                'list_price',
                'attribute_line_ids',
               
            ));
            
            // load all parameters of products to make the product configurator 
            // 2 models requested : 
            //      - product.template.attribute.line
            //      - product.attribute.value
            foreach($data as $k=>$item){
                foreach($item['attribute_line_ids'] as $test) {
                    $data2 = $this->client->search_read('product.template.attribute.line',[['id','=',$test]]);
                    $temp = array();
                    $html_code = array();
                    $temp2 = array();
                    foreach($data2[0]['value_ids'] as $test2 ) {
                        $data3 = $this->client->search_read('product.attribute.value',[['id','=',$test2]]);
                        $temp['properties'] = [$data3[0]['name'],$data3[0]['html_color']];
                        $temp2[]=$temp;
    
                    }
                    $data[$k]['carouselItems'][] = ['title'=> $data2[0]['display_name'],'items' => $temp2];
   
                }
                $data[$k]['carouselItems'][] = (object)[];
            }
            return new JsonResponse($data, Response::HTTP_OK);
    }

    /**
    * @Route("/SignUp", name="signUp", methods={"GET|POST"})
    */
    public function signUp(Request $request) : JsonResponse
    {
        if ($request->isMethod('POST')) {
            
            $content = json_decode($request->getContent(),true);

            // $content['email'];
            // $content['name'];
            // $content['password'];
            // $content['password_2'];


            try {

                $data = $this->client->create('res.users',array(
                    'name'=> $content['name'],
                    'login'=> $content['email'],
                    'password'=> $content['password'],
                    'new_password'=> $content['password_2']
                    
            ));
                
            } catch (\Exception $e) {
                return new JsonResponse(array('error' => True, 'data' => $e->getMessage()), Response::HTTP_OK);
            }
            
            return new JsonResponse(array('error' => False, 'data' => $data), Response::HTTP_OK);

            

                
        }
    }

    /**
     * @Route("/login", name="login", methods="GET|POST")
     */
    public function login(Request $request,  TokenGeneratorInterface $tokenGenerator) : JsonResponse
    {
        if ($request->isMethod('POST')) {
            
            $realm = json_decode($request->getContent(),true);

            $username = $realm['username'];
            $password = $realm['password'];

            try {
                $this->client = new OdooClient($this->getParameter('host'), $this->getParameter('db'), $this->getParameter('user'), $this->getParameter('password'));


                $data = $this->client->search_read('res.users',array(array('email', '=', $username)),array(
                    'id',
                    
                ));
                
            } catch (\Exception $e) {
                return new JsonResponse($e->getMessage(), Response::HTTP_OK);
            }
            $token = $tokenGenerator->generateToken();
            $user = new TToken();
            $user->setToken($token);
            $user->setData(openssl_encrypt(implode(',', [$username, $password]), "AES-128-ECB" ,$this->getParameter('key')));
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            
            
            return new JsonResponse($token, Response::HTTP_OK);

            

                
        }
    }

    /**
     * @Route("/HomeLogged/{token}", name="HomeLogged")
     * @param string $token
     * @param Request $request
     * get encrypt realm in back-end database with token to make connection to customer's odoo profile


     */
    public function HomeLogged($token, Request $request) : JsonResponse
    {
            
        $user = $this->getDoctrine()
                     ->getRepository(TToken::class)
                    ->findOneBy(array('token' => $token));
        $dataUser = explode(',', openssl_decrypt($user->getData(), "AES-128-ECB" ,$this->getParameter('key')));
        $this->user = $dataUser[0];
        $this->password = $dataUser[1];
        
            $this->client = new OdooClient($this->getParameter('host'), $this->getParameter('db'), $this->user, $this->password);


            $data = $this->client->search_read('res.users',array(array('email', '=', $this->user)),array(
                'id',
                'name',
                'email',
                
            ));
            
        
    return new JsonResponse($data, Response::HTTP_OK);
      
    }

    /**
     * @Route("/SignOut/{token}", name="SignOut")
     * @param string $token
     * @param Request $request
     * delete the customer's input from database
     */
    public function SignOut($token, Request $request) : JsonResponse
    {

        $user = $this->getDoctrine()->getManager();
        $user->remove($this->getDoctrine()
                     ->getRepository(TToken::class)
                    ->findOneBy(array('token' => $token)));
        $user->flush();
            
        
        return new JsonResponse('yes', Response::HTTP_OK);
      
    }
}
