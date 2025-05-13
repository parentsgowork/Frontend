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
	justify-content: center;
	width: 100%;
	height: 100%;


	@media (max-width: ${theme.breakpoints.md}) {
		flex-direction: column;
		width: 100%;
	}
`;


const Section = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;

	@media (max-width: 820px) {
		padding: 0 16px;
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
