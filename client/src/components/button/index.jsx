import styled from 'styled-components'
import { Button as AntButton } from 'antd'
import theme from 'styled-theming'

const mainColor = '#5f66f1'

const backgroundColor = theme.variants('mode', 'variant', {
	default: { standard: 'transparent' },
	primary: { standard: mainColor },
	// secondary: { standard: '' },
	// positive: { standard: '' },
	// negative: { standard: '' },
})

const color = theme.variants('mode', 'variant', {
	default: { standard: mainColor },
	primary: { standard: '' },
	// positive: { standard: '' },
	// negative: { standard: '' },
	// secondary: { standard: '' },
})

export const Button = styled(AntButton)`
	/* background: mainColor; */
	border: 0;
	border-radius: 5px;
	padding: 0.45rem 1rem;
	height: auto;
	border: none;
	background-color: ${backgroundColor};
	color: ${color};

	&:hover,
	&:active,
	&:focus {
		// overriding css from antd
		color: ${color};
		background-color: ${backgroundColor};
		cursor: pointer;
		opacity: 0.9;
	}

	&.disabled {
		opacity: 0.5;
		pointer-events: none;
		cursor: not-allowed;

		&.dontShade {
			background-color: initial;
		}
	}

	&.outline_btn {
		width: 7.8rem;
		border: 1px solid ${mainColor};
		margin-right: 1rem;
		transition: all 0.2s ease-in;

		&.transparent {
			border: 1px solid #fff;
			color: #fff;
			&:hover {
				opacity: 1;
				border: 1px solid ${mainColor};
				background-color: ${mainColor};
				color: #fff;
			}
		}
		&:hover {
			opacity: 1;
			background-color: ${mainColor};
			color: #fff;
		}
	}
`
