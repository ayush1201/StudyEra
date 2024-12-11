import React from 'react'
import { useState } from 'react'
import { Chart,registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables);

const InstructorChart = ({courses}) => {

  const [currState,setCurrState] = useState("students");
  
  // function of generating random color
  const generateColor = (numberCols) => {
    const colors = [];
    for(let i=0;i<numberCols;i++){
      const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
      colors.push(color);
    }
    return colors;
  }

  // create data for chart student info
  const chartDataStudent = {
    labels:courses.map((course) => course.courseName),
    datasets:[
      {
        data:courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor:generateColor(courses.length)
      }
    ]
  }


  // create data for chart income info
  const chartDataIncome = {
    labels:courses.map((course) => course.courseName),
    datasets:[
      {
        data:courses.map((course) => course.totalAmount),
        backgroundColor:generateColor(courses.length)
      }
    ]
  }

  // create options
  const options = {
    maintainAspectRatio: false,
  }


  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualise</p>
      <div className='space-x-4 font-semibold'>
        <button className={`rounded-sm p-1 px-3 transition-all duration-200 ${
          currState === "students" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400"
        }`}
        onClick={() => setCurrState("students")}
        >
            Student
        </button>

        <button className={`rounded-sm p-1 px-3 transition-all duration-200 ${
          currState === "income" ? "bg-richblack-700 text-yellow-50" : "text-yellow-400"
        }`}
        onClick={() => setCurrState("income")}
        >
            Income
        </button>
      </div>
      <div className='relative mx-auto aspect-square h-full w-full'>
        <Pie 
            data={currState === "students" ? chartDataStudent : chartDataIncome}
            options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart