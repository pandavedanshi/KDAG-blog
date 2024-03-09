export const SignUpContainer = styled.div`
	${(props) =>
		props.signinIn !== true
			? `
   transform: translateX(100%);
   opacity: 1;
   z-index: 5;
 `
			: null}
`;

export const SignInContainer = styled.div`
	${(props) =>
		props.signinIn !== true ? `transform: translateX(100%);` : null}
`;

export const OverlayContainer = styled.div`
	${(props) =>
		props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
	${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
	${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
	${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`;
