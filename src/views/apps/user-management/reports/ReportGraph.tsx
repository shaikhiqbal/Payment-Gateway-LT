// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import ChartLoader from 'src/views/components/skeleton-loader/ChartLoader'

// ** Types Imports
import { GrapDataType } from 'src/types/apps/graphTypes'

// ** Types
interface GraphProps {
  title: string
  subtitle: string
  data: GrapDataType[]
}

const ReportGraph: React.FC<GraphProps> = props => {
  // ** Props
  const { title, data, subtitle } = props

  // ** States
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    stroke: { width: 0 },
    labels: data.map(({ label }) => label),
    colors: data.map(({ color }) => color),
    dataLabels: {
      enabled: true,
      formatter: (val: string) => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: (val: string) => `${parseInt(val, 10)}`
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Operational',
              formatter: () => '31%',
              color: theme.palette.text.primary
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  useEffect(() => {
    setTimeout(() => {
      setIsDataLoaded(false)
    }, 2000)
    
return () => setIsDataLoaded(true)
  }, [])

  if (isDataLoaded) {
    return <ChartLoader />
  }

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subtitle}
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        <ReactApexcharts type='donut' height={400} options={options} series={data.map(item => item.value)} />
      </CardContent>
    </Card>
  )
}

export default ReportGraph
