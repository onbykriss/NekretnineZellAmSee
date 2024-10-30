import { useEffect, useState } from 'react';
import Service from '../services/NajmoviService';
import useLoading from '../hooks/useLoading';
import useError from '../hooks/useError';

export default function NadzornaPloca() {
  const [podaci, setPodaci] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();

   //*********************************************************************************************************  
  function getPodaci() {
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();

  return async () => {
    showLoading();
    const odgovor = await Service.grafNajam();
   
    if(!Array.isArray(odgovor.data)) {
      console.error('Invalid response:', odgovor);
      prikaziError();
      return [];
   
    }
    return odgovordata.map((Najam) => ({
      y: Najam.ukupnoZakupca,
      name: Najam.adresaNajma,
    }));
  };
 }
}



  // *********************************************************************************************************
 


// *********************************************************************************************************
const fixedOptions = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'Broj zakupca po najmovima',
    align: 'left',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  accessibility: {
    enabled: false,
    point: {
      valueSuffix: '%',
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
};
