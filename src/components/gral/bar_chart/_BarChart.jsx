"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const _BarChart = () => {

  const chartDataProjects = [
    { project: "Formación de Oficio", voluntary: 186 },
    { project: "Apoyo Escolar", voluntary: 305 },
    { project: "Banco de Alimentos", voluntary: 237 },
    { project: "Ropero Comunitario", voluntary: 73, },
    { project: "Huerta Comunitaria", voluntary: 209 },
    { project: "Apoyo a Emprendedores", voluntary: 214 },
    { project: "Campaña de Invierno", voluntary: 355 },
    { project: "Pro", voluntary: 186 },
    { project: "Ban", voluntary: 305 },
    { project: "Do", voluntary: 237 },
    { project: "Paginacion", voluntary: 73, },
    { project: "Paginator", voluntary: 209 },
    { project: "Anduvo", voluntary: 214 },
    { project: "Gracias a dio", voluntary: 355 }
  ]
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#00A558",
    },
    voluntary: {
      label: "Voluntarios",
      color: "var(--primary)",
    }
  }

  return (
    <Card className="gap-3">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartDataProjects}>
            <CartesianGrid vertical={false} />
            <XAxis
              // Esta dataKey es la clave de "chartDataProjects"
              dataKey="project"
              // Esta tickLine une a través de una línea a la dataKey con la barra
              tickLine={false}
              // Separacion con Margin en eje Y
              tickMargin={2}
              // Le pone una línea sobre donde comienzan las barras
              axisLine={false}
              // Cantidad de caracteres a mostrar de la "dataKey"
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              // Es como un bg ó sombreado a la barra cuando haces hover
              cursor={false}
              // Le da estilo a la estadística cuando haces hover
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="voluntary" fill="var(--color-voluntary)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className={"font-roboto text-sm md:text-base 2xl:text-lg text-center mx-auto px-0"}>
        <CardTitle>Cantidad de voluntarios por proyectos</CardTitle>
      </CardFooter>
    </Card>
  )
}