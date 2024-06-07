import styled from 'styled-components'
import { Header, Navigation, Main } from './'
import	{ C } from '../../utils'

const Layout = () => {
		return (
				<StlLayout>
						<Header />
						<Navigation />
						<Main />
				</StlLayout>
		)
}

const StlLayout = styled.div`
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		${C.IS_DESKTOP} {
				min-width: ${C.MIN_DESKTOP_WIDTH};
		};
		${C.IS_MOBILE} {
				min-width: ${C.MIN_MOBILE_WIDTH};
		};
`

export default Layout