import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';
import Service from '../services/NajmoviService';
import useLoading from '../hooks/useLoading';

// *********************************************************************************************************
export default function NadzornaPloca() {
  const [podaci, setPodaci] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  // *********************************************************************************************************
  async function getPodaci() {
    showLoading();
    const odgovor = await Service.grafNajam();
    setPodaci(odgovor.map((Najam) => {
      return {
        y: Najam.ukupnoZakupca,
        name: Najam.nazivNajmovi,
      };
    }));
    hideLoading();
  }

  useEffect(() => {
    getPodaci();
  }, []);

  return (
    <Container className='mt-4'>
      {podaci.length > 0 && (
        <PieChart
          highcharts={Highcharts}
          options={{
            ...fixedOptions,
            series: [
              {
                name: 'Zakupci',
                colorByPoint: true,
                data: podaci,
              },
            ],
          }}
        />
      )}
    </Container>
  );
}

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