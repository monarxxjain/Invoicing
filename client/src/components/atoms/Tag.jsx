import React from 'react'

const Tag = ({tag}) => {
    const variants = {
        green: {
          tagBgColor: "bg-green-500",
          textColor: "text-green-600",
          bgColor: "bg-green-100"
        },
        blue: {
          tagBgColor: "bg-blue-400",
          textColor: "text-blue-600",
          bgColor: "bg-blue-100"
        },
    }
  return (
    <li className={`flex items-center gap-1 p-0.5 rounded px-2 ${variants[tag.variant].bgColor}`}>
        <div className={`rounded text-white px-1 font-semibold ${variants[tag.variant].tagBgColor}`}>{tag.abbr}</div>
        <div className={`text-sm ${variants[tag.variant].textColor}`}>{tag.name}</div>
    </li>
  )
}

export default Tag
