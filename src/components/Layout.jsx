import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { theme } from '../constants/theme';
import Header from './Header';

const Wrapper = styled.div`
	display: flex;
    flex-direction: column;
	// justify-content: center;
	// align-items: center;
	width: 100%;
    min-height: 100vh;
	

	@media (max-width: ${theme.breakpoints.md}) {
		align-items: stretch;
	}
`;

const Container = styled.div`
	display: flex;
	width: 100%;
	height: 100%;


	@media (max-width: ${theme.breakpoints.md}) {
		flex-direction: column;
		width: 100%;
	}
`;

const Top = styled.div`
	// width: 820px;
	max-width: 820px;
	height: 68px;

	@media (max-width: 1280px) {
		width: 100%;
		box-sizing: border-box;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		height: auto;
		box-sizing: border-box;
	}
`;

const Section = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (max-width: 820px) {
		width: 100%;
		height: auto;
	}

	@media (max-width: ${theme.breakpoints.md}) {
		box-sizing: border-box;
	}
`;

const RightAside = styled.div`
	width: 0px;
	height: 100%;

	@media (max-width: 1280px) {
		display: none;
	}
`;

const LeftAside = styled.div`
	width: 0px;
	height: 100%;

	@media (max-width: 1280px) {
		display: none;
	}
`;

const TitleText = styled.div`
	color: var(--black, #000);
	font-family: Pretendard;
	font-size: 28px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-top: 35px;
`;

export default function Layout({ leftAsideContent, rightAsideContent }) {

	return (
		<Wrapper>
            <Header />
			<Container>
				<LeftAside>{leftAsideContent}</LeftAside>
				<Section>
					<Outlet />
				</Section>
				<RightAside>{rightAsideContent}</RightAside>
			</Container>
		</Wrapper>
	);
}
