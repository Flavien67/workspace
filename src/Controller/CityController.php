<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\City;
use App\Form\CityType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class CityController extends AbstractController
{


    /**
    * @Route("/list", name="app_list")
    */
    public function listCity()
    {
        $repository = $this->getDoctrine()->getRepository(City::class);
        $cities = $repository->findall();
        return $this->render('city/listCity.html.twig', array(
        'cities' => $cities
        ));
    } 

    /**
    * @Route("/add", name="app_add")
    *
    * @param Request $request
    *
    * @return \Symfony\Component\HttpFoundation\Response
    */
    public function addCity(Request $request)
    {
        $city = new City();
        $form = $this->createForm(CityType::class, $city,array());
        $form->handleRequest($request);
        if($form->isSubmitted() and $form->isValid()) 
        {
            $city->setName($form['name']->getData());
            $city->setCountrycode($form['countrycode']->getData());
            $city->setPopulation($form['population']->getData());
            $em = $this->getDoctrine()->getManager();
            $em->persist($city);
            $em->flush();

            return $this->redirectToRoute('app_list');
        }

        return $this->render('city/addCity.html.twig', array('form' => $form->createView()
        ));

    }

    /**
    * @Route("/edit/{id}", name="app_edit")
    *
    * @param int $id
    * @param Request $request
    *
    * @return \Symfony\Component\HttpFoundation\Response
    */
    public function editCity($id, Request $request)
    {
        $city = $this->getDoctrine()
        ->getRepository(City::class)
        ->findOneBy(array('id' => $id));
        $form = $this->createForm(CityType::class, $city,array());
        $form->handleRequest($request);
        if ($form->isSubmitted() and $form->isValid()) {
            $city->setName($form['name']->getData());
            $city->setCountrycode($form['countrycode']->getData());
            $city->setPopulation($form['population']->getData());
            $em = $this->getDoctrine()->getManager();
            $em->persist($city);
            $em->flush();

            return $this->redirectToRoute('app_list');
        } 
        return $this->render('city/editCity.html.twig', array('city' => $city,'form' => $form->createView()));

    }

    /**
    * @Route("/delete/{id}", name="app_delete")
    *
    * @param int $id
    *
    * @return \Symfony\Component\HttpFoundation\Response
    */
    public function deleteCity($id)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove( $this->getDoctrine()
        ->getRepository(City::class)
        ->findOneBy(array('id' => $id) ));
        $em->flush();
    return $this->redirectToRoute('app_list');
    }
    
}
    
    

     

