import { useState } from 'react'
export function CourseCard({
  courseAbbreviation,
  courseName,
  courseDescr,
  semesterList,
  semesterLinks,
}: {
  courseAbbreviation: string
  courseName: string
  courseDescr: string
  semesterList: string[]
  semesterLinks: string[]
}) {
  const secondaryColor = '#9e1b32'
  const backgroundColor = '#dc1a28'
  const graphicLink = `/course_logos/${courseAbbreviation}.png`
  return (
    <div
      style={{ backgroundColor, marginTop: '1rem', transition: 'background-color 01.0s ease-in-out' }}
      className="group relative aspect-[2.5/2] rounded-3xl hover:cursor-pointer hover:bg-transparent "
    >
      {/* px-5 ? */}
      <div className="relative z-10 flex aspect-[2.5/2] select-none flex-col items-center justify-center gap-2 rounded-3xl px-1 text-center font-bold text-white opacity-100 transition-all duration-300 group-hover:z-0 group-hover:opacity-0">
        <div
          className="absolute left-0 top-0 h-full w-full rounded-3xl"
          style={{
            backgroundColor: secondaryColor,
            maskImage: `url(${graphicLink})`,
            maskSize: 'cover',
            maskPosition: 'center',
            WebkitMaskImage: `url(${graphicLink})`,
            WebkitMaskSize: 'cover',
            WebkitMaskPosition: 'center',
          }}
        ></div>
        <h1 className="z-10 text-2xl">{courseName}</h1>
        <h2 className="max-w-[90%]opacity-75 z-10 text-xs ">{courseDescr}</h2>
      </div>
      <div className="absolute left-0 top-0 z-0 grid aspect-[2.5/2] h-full w-full select-none place-items-center rounded-3xl text-center opacity-0 transition-all duration-300 group-hover:z-10 group-hover:opacity-100">
        <div className="place-items-center text-xl font-bold  text-white hover:cursor-pointer">
          {semesterList.map((semester, index) => (
            <p key={index} style={{ margin: '0.5rem 0' }}>
              <a
                href={semesterLinks[index]}
                className="flex h-full w-full flex-col items-center justify-center rounded-tr-3xl text-center text-white transition-all duration-150 md:hover:text-black"
              >
                {semester}
              </a>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
