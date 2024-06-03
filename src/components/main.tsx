import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import DfxTitleSection from './title-section';
import { useBuyTab } from './tabs/buy.tab';
import { useSellTab } from './tabs/sell.tab';
import { useSwapTab } from './tabs/swap.tab';

import {
  DfxLogo,
  StyledButton,
  StyledButtonColor,
  StyledButtonWidth,
  StyledLink,
  StyledModal,
  StyledModalType,
  StyledTabContainer,
  StyledVerticalStack,
} from '@dfx.swiss/react-components';
import { useAuthContext, useSessionContext, useUserContext } from '@dfx.swiss/react';

export function Main(): JSX.Element {
  const { authenticationToken } = useAuthContext();
  const { isProcessing, needsSignUp, signUp, logout } = useSessionContext();
  const { register } = useUserContext();
  const [showsUserLink, setShowsUserLink] = useState(false);
  const [showsInstallHint, setShowsInstallHint] = useState(false);

  useEffect(() => {
    register(() => setShowsUserLink(true));
  });

  return (
    <>
      {/* MODALS */}
      <StyledModal type={StyledModalType.ALERT} isVisible={showsInstallHint}>
        <StyledVerticalStack gap={4}>
          <h1>Please install MetaMask or Rabby!</h1>
          <p>
            You need to install the MetaMask or Rabby browser extension to be able to use this service. Visit{' '}
            <StyledLink label="metamask.io" url="https://metamask.io" dark /> or{' '}
            <StyledLink label="rabby.io" url="https://rabby.io/" dark /> for more details.
          </p>

          <div className="mx-auto">
            <StyledButton width={StyledButtonWidth.SM} onClick={() => setShowsInstallHint(false)} label="Got it." />
          </div>
        </StyledVerticalStack>
      </StyledModal>

      <StyledModal type={StyledModalType.ALERT} isVisible={needsSignUp}>
        <StyledVerticalStack>
          <h1>Terms and Conditions.</h1>
          <p>
            Please read our terms and conditions and click on ”Next” to confirm and to continue to the DFX Multichain
            Service.
          </p>
          <a
            className="underline underline-offset-2 pt-6 pb-4"
            target="_blank"
            href={process.env.REACT_APP_TNC_URL}
            rel="noopener noreferrer"
          >
            Terms and conditions DFX Swiss.
          </a>
          <div className="mx-auto">
            <StyledButton
              width={StyledButtonWidth.SM}
              color={StyledButtonColor.RED}
              label="Next"
              caps={false}
              onClick={() => signUp()}
              isLoading={isProcessing}
            />
          </div>
        </StyledVerticalStack>
      </StyledModal>

      <StyledModal isVisible={showsUserLink} onClose={setShowsUserLink} type={StyledModalType.ALERT}>
        <StyledVerticalStack gap={4}>
          <h1>Welcome back!</h1>
          <p>
            It looks like you already have an account with DFX. We have just sent you an E-Mail. Click on the sent link
            to confirm your mail address. This way you don't need to go through KYC again.
          </p>
          <div className="mx-auto">
            <StyledButton width={StyledButtonWidth.SM} onClick={() => setShowsUserLink(false)} label="Got it." />
          </div>
        </StyledVerticalStack>
      </StyledModal>

      {/* CONTENT */}
      <div className="text-center p-2 mt-4">
        <div className="max-w-6xl text-left mx-auto ">
          <div className="flex justify-between">
            <a target="_blank" href={process.env.REACT_APP_DFX_URL} rel="noopener noreferrer">
              <DfxLogo />
            </a>
            {authenticationToken && <StyledButton label="DISCONNECT" onClick={logout} />}
          </div>
          <div className="md:flex justify-between mt-6">
            <div className="basis-3/5 max-w-[50%] px-6 mx-auto md:mx-0">
              <DfxTitleSection heading="Frankencoin Exchange" subheading="Buy • Sell • Swap" />
            </div>
          </div>
          {!isMobile ? (
            <div className="my-6">
              <StyledTabContainer tabs={[useBuyTab(), useSellTab(), useSwapTab()]} />
            </div>
          ) : (
            <>
              <p className="text-center py-12">
                Our DFX Exchange is not yet available on mobile. Visit the DFX Exchange via your computer's web browser.
              </p>
              <p className="text-center pb-24">Please check back later for the mobile version.</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-40 justify-center pb-4">
          <StyledLink label="Terms and conditions" url={process.env.REACT_APP_TNC_URL} />
          <StyledLink label="Privacy policy" url={process.env.REACT_APP_PPO_URL} />
          <StyledLink label="Imprint" url={process.env.REACT_APP_IMP_URL} />
        </div>
      </div>
    </>
  );
}
