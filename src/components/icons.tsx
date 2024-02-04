export function CourseCard({
  courseAbbreviation,
  courseName,
  courseDescr,
  semesterLink,
}: {
  courseAbbreviation: string
  courseName: string
  courseDescr: string
  semesterLink: string
}) {
  const secondaryColor = '#9e1b32'
  const backgroundColor = '#dc1a28'
  const graphicLink = `/course_logos/${courseAbbreviation}.png`

  // Function to handle click event

  return (
    <div
      style={{ backgroundColor, marginTop: '1rem', transition: 'background-color 01.0s ease-in-out' }}
      className="group relative aspect-[2.5/2] w-full rounded-3xl hover:cursor-pointer hover:bg-transparent"
    >
      <a href={semesterLink} />
      {/* px-5 ? */}
      <a
        href={semesterLink}
        className="relative z-10 flex aspect-[2.5/2] select-none flex-col items-center justify-center gap-2 rounded-3xl px-1 text-center font-bold text-white opacity-100 transition-all duration-300 group-hover:z-0 group-hover:opacity-50"
      >
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
      </a>
    </div>
  )
}
