import React from "react"
import { css } from "@emotion/core"
import { SvgArrowRightStraight } from "@guardian/src-icons"
import { space } from "@guardian/src-foundations"
import { LinkButton } from "../index"

/* eslint-disable react/jsx-key */
const textIconButtons = [
	<LinkButton href="#" icon={<SvgArrowRightStraight />} nudgeIcon={true}>
		Hover over me
	</LinkButton>,
	<LinkButton
		href="#"
		iconSide="right"
		nudgeIcon={true}
		icon={<SvgArrowRightStraight />}
	>
		Hover over me
	</LinkButton>,
]

/* eslint-enable react/jsx-key */

const flexStart = css`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;

	> div {
		margin-right: ${space[9]}px;
	}
`

export const textAndIconLinkButtonsWithNudge = () => (
	<div>
		<div css={flexStart}>
			{textIconButtons.map((button, index) => (
				<div key={index}>{button}</div>
			))}
		</div>
	</div>
)
textAndIconLinkButtonsWithNudge.story = {
	name: "text and icon link buttons with nudge animation",
}
