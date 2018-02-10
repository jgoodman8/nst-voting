import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const data = [
  {subject: 'Social Media', A: 120, B: 110, fullMark: 150},
  {subject: 'Classic Media', A: 98, B: 130, fullMark: 150},
  {subject: 'Valoración ACB', A: 86, B: 130, fullMark: 150},
  {subject: 'Votos afición', A: 99, B: 100, fullMark: 150},
  {subject: 'Popularidad', A: 65, B: 85, fullMark: 150},
];

export default class RadarAnalytic extends React.Component {
  render() {
    return (
      <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
        <PolarGrid/>
        <PolarAngleAxis dataKey="subject"/>
        <PolarRadiusAxis/>
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
      </RadarChart>
    );
  }
}