import styled from 'styled-components'
import { Input } from 'antd'

export const StyledInput = styled(Input)`
	height: 2.5rem;
	width: 26rem;
	border: 1px solid rgba(0, 0, 0, 0, 0.2);
	border-left: 7px solid #5f66f1;
	@media (max-width: 480px) {
		width: 20rem;
	}
`
export const StyledInputPassword = styled(Input.Password)`
	height: 2.5rem;
	width: 26rem;
	border: 1px solid rgba(0, 0, 0, 0, 0.2);
	border-left: 7px solid #5f66f1;
	@media (max-width: 480px) {
		width: 20rem;
	}
`
