export function CourseCard({courseAbbreviation, courseName, courseDescr, semesterList, semesterLinks}: 
	{courseAbbreviation:string, courseName:string, courseDescr: string, semesterList: string[], semesterLinks: string[]}) {
	const secondaryColor = "#9e1b32";
	const backgroundColor = "#dc1a28";
	const graphicLink = `/course_logos/${courseAbbreviation}.png`;

	return (
		<div style={{ paddingTop: '2vh' }}>
			<div
				style={{ backgroundColor }}
				className="group relative aspect-[2.5/2] rounded-3xl hover:cursor-pointer hover:bg-transparent"
			>
				{/* px-5 ? */}
				<div
					className="relative flex aspect-[2.5/2] select-none flex-col items-center justify-center gap-2 rounded-3xl text-center font-bold text-white opacity-100 transition-all duration-300 group-hover:opacity-0 px-1"
				>
					<div
						className="absolute left-0 top-0 h-full w-full rounded-3xl"
						style={{
							backgroundColor: secondaryColor,
							maskImage: `url(${graphicLink})`,
							maskSize: "cover",
							maskPosition: "center",
							WebkitMaskImage: `url(${graphicLink})`,
							WebkitMaskSize: "cover",
							WebkitMaskPosition: "center",
						}}
					></div>
					<h1 className="z-10 text-3xl">{courseName}</h1>
					<h2 className="z-10 max-w-[90%]opacity-75 text-xs ">{courseDescr}</h2>
				</div>
				<div className="absolute left-0 top-0 grid aspect-[2.5/2] h-full w-full select-none place-items-center rounded-3xl text-center opacity-0 transition-all duration-300 group-hover:opacity-100">
					<div className="text-white place-items-center text-2xl  hover:cursor-pointer font-bold">
						{semesterList.map((semester, index) => (
							<p key={index} style={{margin: "0.5rem 0"}}>
								<a href={semesterLinks[index]} className= 'flex h-full w-full flex-col items-center justify-center rounded-tr-3xl text-center text-white transition-all duration-150 md:hover:text-black'>
									{semester}
								</a>
							</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
