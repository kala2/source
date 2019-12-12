import { css } from "@emotion/core"
import {
	Breakpoint,
	space,
	breakpoints,
	palette,
} from "@guardian/src-foundations"
import { from } from "@guardian/src-foundations/mq"

type GridBreakpoint = Extract<
	Breakpoint,
	"mobile" | "tablet" | "desktop" | "wide"
>
const gridBreakpoints: readonly GridBreakpoint[] = [
	"mobile",
	"tablet",
	"desktop",
	"wide",
] as const
type GridBreakpoints = typeof gridBreakpoints[number]

type GridColumns = {
	[key in GridBreakpoints]: number
}

type ContainerWidths = {
	[key in GridBreakpoints]: string
}

const gridColumns: GridColumns = {
	mobile: 4,
	tablet: 12,
	desktop: 12,
	wide: 16,
}

const containerWidths: ContainerWidths = {
	mobile: "100%",
	tablet: `${breakpoints.tablet}px`,
	desktop: `${breakpoints.desktop}px`,
	wide: `${breakpoints.wide}px`,
}

const GUTTER_WIDTH = space[5]

const gridRow = css`
	@supports (display: grid) {
		display: grid;
	}
	/* stylelint-disable-next-line value-no-vendor-prefix */
	display: -ms-grid;

	grid-auto-columns: max-content;
	column-gap: ${GUTTER_WIDTH}px;

	/* horizontal padding is smaller on mobile */
	padding: 0 ${space[3]}px;
	${from.tablet} {
		padding: 0 ${GUTTER_WIDTH}px;
	}
`

const [
	gridRowMobile,
	gridRowTablet,
	gridRowDesktop,
	gridRowWide,
] = gridBreakpoints.map(breakpoint => {
	const msGridColumns = `-ms-grid-columns: (minmax(0, 1fr))[${gridColumns[breakpoint]}]`

	return css`
		${from[breakpoint]} {
			width: ${containerWidths[breakpoint]}px;
			grid-template-columns: repeat(${gridColumns[breakpoint]}, 1fr);
			${msGridColumns};
		}
	`
})

const gridItemSpans = ({
	breakpoints,
	spans,
}: {
	breakpoints: GridBreakpoint[]
	spans: number[]
}) => {
	return breakpoints.reduce((acc, breakpoint, index) => {
		if (spans[index] === 0) {
			return `${acc}
				${from[breakpoint]} {
					display: none;
				}
			`
		}

		return `${acc}
			${from[breakpoint]} {
				display: block;
				grid-column-end: span ${spans[index]};
				-ms-grid-column-span: ${spans[index]};,
			}
		`
	}, "")
}

const gridItemStartingPos = ({
	breakpoints,
	startingPositions,
}: {
	breakpoints: GridBreakpoint[]
	startingPositions: number[]
}) => {
	return breakpoints.reduce((acc, breakpoint, index) => {
		return `${acc}
			${from[breakpoint]} {
				grid-column-start: ${startingPositions[index]};
				-ms-grid-column: ${
					startingPositions[index] > 0
						? startingPositions[index]
						: gridColumns[breakpoint] + 2 + startingPositions[index]
				};
			}
		`
	}, "")
}

const gridItem = ({
	breakpoints,
	spans,
	startingPositions,
}: {
	breakpoints: GridBreakpoint[]
	spans: number[]
	startingPositions: number[]
}) => css`
	${gridItemSpans({ breakpoints, spans })}
	${gridItemStartingPos({
		breakpoints,
		startingPositions,
	})}
	/* stylelint-disable-next-line property-no-vendor-prefix */
	-ms-grid-row: 1;
`

const borderRightStyle = css`
	border-right: 1px solid ${palette.border.secondary};
	padding-right: ${GUTTER_WIDTH / 2}px;
	margin-right: ${-GUTTER_WIDTH / 2}px;
`

export {
	gridRow,
	gridRowMobile,
	gridRowTablet,
	gridRowDesktop,
	gridRowWide,
	gridItem,
	GridBreakpoint,
	borderRightStyle,
}
