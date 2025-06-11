import './Pay.scss';

const CART_ITEMS = [
  {
    name: 'Custom Chumbury',
    desc: 'Diamond, 18K white 14.5',
    unit: 1,
    note: 'This item needs 5-7 business days to process.',
    price: '$35.00', // Adjusted to match image
    image: 'https://storage.googleapis.com/a1aa/image/68b9397d-3834-43c1-787c-a9755328ef1e.jpg',
  },
  {
    name: 'Custom Joyful Stone',
    desc: 'Diamond, 18K white 14.5',
    unit: 1,
    note: 'This item needs 5-7 business days to process.',
    price: '$35.00', // Adjusted to match image
    image: 'https://storage.googleapis.com/a1aa/image/f4d62865-a8f7-4c28-708d-22c0c55e0455.jpg',
  },
];

export default function Pay() {
  return (
    <div className="pay-html-page">
      <div className="container payPage">
        <div className="pay-html-content">
          {/* Left Side */}
          <div className="left">
            {/* Express checkout */}
            <div className="express-checkout">
              <label>EXPRESS CHECKOUT</label>
              <button className="apple-pay"><i className="fab fa-apple-pay"></i></button>
              <span className="or-text">OR</span>
              <button className="google-pay"><i className="fab fa-google-pay"></i></button>
            </div>
            {/* Contact */}
            <div className="section contact-section">
              <div className='contact-login'>
                <label className='title'>Contact</label>
                <a>
                  Login
                </a>
              </div>
              <input autoComplete="email" id="email" name="email" placeholder="Email" type="email" />
              <label className="checkbox-label" htmlFor="email-offers">
                <input id="email-offers" name="email-offers" type="checkbox" />
                Email me with news and offers
              </label>
            </div>
            {/* Delivery */}
            <div className="section delivery-section">
              <label className='title'>Delivery</label>
              <select id="country" name="country"><option>United States</option></select>
              <div className="delivery-row">
                <input autoComplete="given-name" id="first-name" name="first-name" placeholder="First name" type="text" />
                <input autoComplete="family-name" id="last-name" name="last-name" placeholder="Last name" type="text" />
              </div>
              <input autoComplete="address-line1" id="address" name="address" placeholder="Address" type="text" />
              <input autoComplete="address-line2" id="apt" name="apt" placeholder="Apartment, suite, etc. (optional)" type="text" />
              <div className="delivery-row">
                <input autoComplete="address-level2" id="city" name="city" placeholder="City" type="text" />
                <input autoComplete="address-level1" id="state" name="state" placeholder="State" type="text" />
                <input autoComplete="postal-code" id="zip" name="zip" placeholder="ZIP code" type="text" />
              </div>
              <input autoComplete="tel" id="phone" name="phone" placeholder="Phone" type="tel" />
              <label className="checkbox-label" htmlFor="phone-offers">
                <input id="phone-offers" name="phone-offers" type="checkbox" />
                Text me with news and offers
              </label>
            </div>
            {/* Shipping method */}
            <div className="section shipping-method">
              <label className='title'>Shipping method</label>
              <div className="shipping-options" role="radiogroup">
                <div className="shipping-option selected" role="radio" tabIndex={0} aria-checked="true">
                  <div className="icon">
                    <img alt='' src='./images/shiping.svg' />
                  </div>
                  Shipping
                  <hr/>
                  <button type="button">Selected</button>
                </div>
                <div className="shipping-option" role="radio" tabIndex={-1} aria-checked="false">
                  <div className="icon"><i className="fas fa-store"></i></div>
                  Store Pickup
                  <hr />
                  <button type="button">Select</button>
                </div>
              </div>
              <div className="shipping-info">
                Enter your shipping address to view available shipping methods.
              </div>
              <label className="checkbox-label" htmlFor="more-kinds">
                <input id="more-kinds" name="more-kinds" type="checkbox" />
                MORE KINDNESS, LESS WASTE. We're on a mission to do more with Kind. Check the box to receive one jewelry pouch with this order.
              </label>
            </div>
            {/* Payment */}
            <div className="section payment-section">
              <label>
                <input defaultChecked name="payment" type="radio" value="credit-card" />
                CREDIT CARD
                <span className="payment-icons">
                  <svg width="222" height="26" viewBox="0 0 222 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_94_1128)">
                      <g clip-path="url(#clip1_94_1128)">
                        <g clip-path="url(#clip2_94_1128)">
                          <path opacity="0.07" d="M38.2282 0.0205078H3.96152C2.14111 0.0205078 0.749023 1.41259 0.749023 3.23301V22.508C0.749023 24.3284 2.24819 25.7205 3.96152 25.7205H38.2282C40.0486 25.7205 41.4407 24.3284 41.4407 22.508V3.23301C41.4407 1.41259 39.9415 0.0205078 38.2282 0.0205078Z" fill="black" />
                          <path d="M38.2282 1.0918C39.4061 1.0918 40.3698 2.05555 40.3698 3.23346V22.5085C40.3698 23.6864 39.4061 24.6501 38.2282 24.6501H3.96149C2.78357 24.6501 1.81982 23.6864 1.81982 22.5085V3.23346C1.81982 2.05555 2.78357 1.0918 3.96149 1.0918H38.2282Z" fill="white" />
                          <path d="M31.0534 10.8357H30.7322C30.3039 11.9065 29.9826 12.4419 29.6614 14.0482H31.6959C31.3747 12.4419 31.3747 11.6923 31.0534 10.8357ZM34.1589 17.1536H32.3384C32.2314 17.1536 32.2314 17.1536 32.1243 17.0465L31.9101 16.0827L31.803 15.8686H29.233C29.1259 15.8686 29.0189 15.8686 29.0189 16.0827L28.6976 17.0465C28.6976 17.1536 28.5905 17.1536 28.5905 17.1536H26.3418L26.5559 16.6182L29.6614 9.3365C29.6614 8.80108 29.9826 8.58691 30.518 8.58691H32.1243C32.2314 8.58691 32.3384 8.58691 32.3384 8.80108L33.8376 15.7615C33.9447 16.1898 34.0518 16.5111 34.0518 16.9394C34.1589 17.0465 34.1589 17.0465 34.1589 17.1536ZM19.8097 16.8323L20.238 14.9048C20.3451 14.9048 20.4522 15.0119 20.4522 15.0119C21.2018 15.3332 21.9514 15.5473 22.7009 15.4402C22.9151 15.4402 23.2364 15.3332 23.4505 15.2261C23.9859 15.0119 23.9859 14.4765 23.5576 14.0482C23.3434 13.834 23.0222 13.7269 22.7009 13.5127C22.2726 13.2986 21.8443 13.0844 21.523 12.7632C20.238 11.6923 20.6664 10.1932 21.4159 9.44358C22.0584 9.01525 22.3797 8.58691 23.2364 8.58691C24.5214 8.58691 25.9134 8.58691 26.5559 8.80108H26.663C26.5559 9.44358 26.4489 9.979 26.2347 10.6215C25.6993 10.4073 25.1639 10.1932 24.6284 10.1932C24.3072 10.1932 23.9859 10.1932 23.6647 10.3002C23.4505 10.3002 23.3434 10.4073 23.2364 10.5144C23.0222 10.7286 23.0222 11.0498 23.2364 11.264L23.7718 11.6923C24.2001 11.9065 24.6284 12.1207 24.9497 12.3348C25.4851 12.6561 26.0205 13.1915 26.1276 13.834C26.3418 14.7977 26.0205 15.6544 25.1639 16.2969C24.6284 16.7252 24.4143 16.9394 23.6647 16.9394C22.1655 16.9394 20.9876 17.0465 20.0239 16.7252C19.9168 16.9394 19.9168 16.9394 19.8097 16.8323ZM16.0618 17.1536C16.1689 16.404 16.1689 16.404 16.2759 16.0827C16.8114 13.7269 17.3468 11.264 17.7751 8.90816C17.8822 8.694 17.8822 8.58691 18.0964 8.58691H20.0239C19.8097 9.87191 19.5955 10.8357 19.2743 12.0136C18.953 13.6198 18.6318 15.2261 18.2034 16.8323C18.2034 17.0465 18.0964 17.0465 17.8822 17.0465M6.10303 8.80108C6.10303 8.694 6.31719 8.58691 6.42428 8.58691H10.0651C10.6005 8.58691 11.0289 8.90816 11.1359 9.44358L12.0997 14.1552C12.0997 14.2623 12.0997 14.2623 12.2068 14.3694C12.2068 14.2623 12.3139 14.2623 12.3139 14.2623L14.5626 8.80108C14.4555 8.694 14.5626 8.58691 14.6697 8.58691H16.9184C16.9184 8.694 16.9184 8.694 16.8114 8.80108L13.4918 16.6182C13.3847 16.8323 13.3847 16.9394 13.2776 17.0465C13.1705 17.1536 12.9564 17.0465 12.7422 17.0465H11.1359C11.0289 17.0465 10.9218 17.0465 10.9218 16.8323L9.20844 10.1932C8.99428 9.979 8.67303 9.65775 8.24469 9.55066C7.60219 9.22941 6.42428 9.01525 6.21011 9.01525L6.10303 8.80108Z" fill="#142688" />
                        </g>
                      </g>
                    </g>
                    <g clip-path="url(#clip3_94_1128)">
                      <g clip-path="url(#clip4_94_1128)">
                        <g clip-path="url(#clip5_94_1128)">
                          <path opacity="0.07" d="M83.9181 0.0205078H49.6515C47.831 0.0205078 46.439 1.41259 46.439 3.23301V22.508C46.439 24.3284 47.9381 25.7205 49.6515 25.7205H83.9181C85.7385 25.7205 87.1306 24.3284 87.1306 22.508V3.23301C87.1306 1.41259 85.6315 0.0205078 83.9181 0.0205078Z" fill="black" />
                          <path d="M83.9181 1.0918C85.096 1.0918 86.0598 2.05555 86.0598 3.23346V22.5085C86.0598 23.6864 85.096 24.6501 83.9181 24.6501H49.6514C48.4735 24.6501 47.5098 23.6864 47.5098 22.5085V3.23346C47.5098 2.05555 48.4735 1.0918 49.6514 1.0918H83.9181Z" fill="white" />
                          <path d="M62.5017 20.3667C66.6415 20.3667 69.9975 17.0107 69.9975 12.8708C69.9975 8.731 66.6415 5.375 62.5017 5.375C58.3619 5.375 55.0059 8.731 55.0059 12.8708C55.0059 17.0107 58.3619 20.3667 62.5017 20.3667Z" fill="#EB001B" />
                          <path d="M71.0681 20.3667C75.2079 20.3667 78.5639 17.0107 78.5639 12.8708C78.5639 8.731 75.2079 5.375 71.0681 5.375C66.9283 5.375 63.5723 8.731 63.5723 12.8708C63.5723 17.0107 66.9283 20.3667 71.0681 20.3667Z" fill="#F79E1B" />
                          <path d="M69.9973 12.8704C69.9973 10.3004 68.7123 8.0516 66.7848 6.7666C64.8573 8.15868 63.5723 10.4074 63.5723 12.8704C63.5723 15.3333 64.8573 17.6891 66.7848 18.9741C68.7123 17.6891 69.9973 15.4404 69.9973 12.8704Z" fill="#FF5F00" />
                        </g>
                      </g>
                    </g>
                    <g clip-path="url(#clip6_94_1128)">
                      <g clip-path="url(#clip7_94_1128)">
                        <g clip-path="url(#clip8_94_1128)">
                          <path opacity="0.07" d="M129.608 0.0205078H95.3414C93.521 0.0205078 92.1289 1.41259 92.1289 3.23301V22.508C92.1289 24.3284 93.6281 25.7205 95.3414 25.7205H129.608C131.428 25.7205 132.821 24.3284 132.821 22.508V3.23301C132.821 1.41259 131.321 0.0205078 129.608 0.0205078Z" fill="black" />
                          <path d="M129.608 1.0918C130.786 1.0918 131.75 2.05555 131.75 3.23346V22.5085C131.75 23.6864 130.786 24.6501 129.608 24.6501H95.3414C94.1635 24.6501 93.1997 23.6864 93.1997 22.5085V3.23346C93.1997 2.05555 94.1635 1.0918 95.3414 1.0918H129.608Z" fill="#006FCF" />
                          <path d="M101.735 11.0156L102.564 13.0244H100.913L101.735 11.0156ZM118.949 11.0991H115.761V11.9847H118.897V13.3114H115.767V14.2987H118.955V15.0901L121.179 12.6861L118.955 10.1803L118.949 11.0991ZM103.89 8.59334H108.168L109.118 10.6654L109.998 8.58691H121.102L122.257 9.86121L123.451 8.58691H128.551L124.783 12.7118L128.512 16.8109H123.336L122.182 15.5366L120.977 16.8109H102.869L102.34 15.5366H101.13L100.6 16.8109H96.4121L99.9309 8.58691H103.604L103.89 8.59334ZM113.166 9.7477H110.769L109.163 13.5342L107.422 9.7477H105.043V14.8984L102.837 9.7477H100.703L98.1522 15.6501H99.8174L100.346 14.3758H103.126L103.655 15.6501H106.568V11.4364L108.443 15.6566H109.717L111.58 11.4493V15.6576H113.142L113.167 9.74663L113.166 9.7477ZM123.168 12.7118L125.878 9.7477H123.927L122.213 11.596L120.555 9.7477H114.244V15.6566H120.465L122.193 13.7954L123.851 15.6566H125.859L123.168 12.7118Z" fill="white" />
                        </g>
                      </g>
                    </g>
                    <g clip-path="url(#clip9_94_1128)">
                      <g clip-path="url(#clip10_94_1128)">
                        <g clip-path="url(#clip11_94_1128)">
                          <path opacity="0.07" d="M175.288 0.0205078H141.022C139.201 0.0205078 137.809 1.41259 137.809 3.23301V22.508C137.809 24.3284 139.308 25.7205 141.022 25.7205H175.288C177.109 25.7205 178.501 24.3284 178.501 22.508V3.23301C178.501 1.41259 177.002 0.0205078 175.288 0.0205078Z" fill="black" />
                          <path d="M175.288 1.0918C176.466 1.0918 177.43 2.05555 177.43 3.23346V22.5085C177.43 23.6864 176.466 24.6501 175.288 24.6501H141.022C139.844 24.6501 138.88 23.6864 138.88 22.5085V3.23346C138.88 2.05555 139.844 1.0918 141.022 1.0918H175.288Z" fill="white" />
                          <path d="M141.632 7.68807H139.951V13.5777H141.632C142.521 13.5777 143.163 13.3635 143.731 12.903C144.405 12.3462 144.802 11.5109 144.802 10.6436C144.791 8.89811 143.495 7.68807 141.632 7.68807ZM142.981 12.1213C142.617 12.4426 142.157 12.5925 141.407 12.5925H141.096V8.69465H141.407C142.146 8.69465 142.596 8.82315 142.981 9.16582C143.377 9.5192 143.613 10.0653 143.613 10.6329C143.613 11.2004 143.377 11.7679 142.981 12.1213ZM145.326 7.68807H146.472V13.5777H145.326V7.68807ZM149.278 9.94753C148.592 9.69053 148.389 9.5192 148.389 9.20865C148.389 8.83386 148.753 8.55545 149.246 8.55545C149.588 8.55545 149.877 8.69465 150.166 9.03732L150.766 8.25561C150.274 7.82728 149.685 7.6024 149.031 7.6024C147.993 7.6024 147.19 8.33057 147.19 9.29432C147.19 10.1082 147.564 10.5258 148.635 10.9113C149.085 11.0719 149.31 11.179 149.428 11.2432C149.652 11.3932 149.77 11.6073 149.77 11.8536C149.77 12.3355 149.395 12.6889 148.881 12.6889C148.335 12.6889 147.896 12.4104 147.629 11.9072L146.89 12.6246C147.414 13.4063 148.057 13.749 148.924 13.749C150.113 13.749 150.959 12.9566 150.959 11.8108C150.98 10.8577 150.584 10.4294 149.278 9.94753ZM151.334 10.6436C151.334 12.3783 152.694 13.7169 154.439 13.7169C154.932 13.7169 155.36 13.6205 155.874 13.3742V12.0249C155.414 12.4854 155.007 12.6674 154.493 12.6674C153.336 12.6674 152.512 11.8322 152.512 10.6329C152.512 9.49778 153.358 8.60899 154.439 8.60899C154.985 8.60899 155.403 8.80174 155.874 9.2729V7.92365C155.371 7.66665 154.953 7.55957 154.46 7.55957C152.736 7.55957 151.334 8.93024 151.334 10.6436ZM164.997 11.6502L163.423 7.68807H162.17L164.666 13.7276H165.287L167.824 7.68807H166.582L164.997 11.6502ZM168.349 13.5777H171.605V12.5818H169.495V10.9969H171.53V10.0011H169.495V8.69465H171.605V7.68807H168.349V13.5777ZM176.156 9.43353C176.156 8.33057 175.395 7.69878 174.067 7.69878H172.365V13.5884H173.511V11.2218H173.661L175.245 13.5884H176.659L174.806 11.104C175.674 10.922 176.156 10.333 176.156 9.43353ZM173.843 10.408H173.511V8.6197H173.864C174.581 8.6197 174.967 8.91953 174.967 9.49778C174.967 10.0867 174.581 10.408 173.843 10.408Z" fill="#231F20" />
                          <path d="M159.397 13.7919C160.229 13.7919 161.028 13.4612 161.616 12.8726C162.205 12.284 162.536 11.4857 162.536 10.6533C162.536 9.82085 162.205 9.02253 161.616 8.43393C161.028 7.84532 160.229 7.51465 159.397 7.51465C158.565 7.51465 157.766 7.84532 157.178 8.43393C156.589 9.02253 156.258 9.82085 156.258 10.6533C156.258 11.4857 156.589 12.284 157.178 12.8726C157.766 13.4612 158.565 13.7919 159.397 13.7919Z" fill="url(#paint0_linear_94_1128)" />
                          <path opacity="0.65" d="M159.397 13.7919C160.229 13.7919 161.028 13.4612 161.616 12.8726C162.205 12.284 162.536 11.4857 162.536 10.6533C162.536 9.82085 162.205 9.02253 161.616 8.43393C161.028 7.84532 160.229 7.51465 159.397 7.51465C158.565 7.51465 157.766 7.84532 157.178 8.43393C156.589 9.02253 156.258 9.82085 156.258 10.6533C156.258 11.4857 156.589 12.284 157.178 12.8726C157.766 13.4612 158.565 13.7919 159.397 13.7919Z" fill="url(#paint1_linear_94_1128)" />
                          <path d="M176.97 8.05809C176.97 7.951 176.895 7.89746 176.777 7.89746H176.605V8.41146H176.734V8.208L176.884 8.41146H177.034L176.862 8.19729C176.927 8.18659 176.97 8.13304 176.97 8.05809ZM176.755 8.13304H176.734V7.99384H176.755C176.82 7.99384 176.852 8.01525 176.852 8.05809C176.852 8.11163 176.82 8.13304 176.755 8.13304Z" fill="#231F20" />
                          <path d="M176.798 7.70508C176.552 7.70508 176.348 7.90854 176.348 8.15483C176.348 8.40112 176.552 8.60458 176.798 8.60458C177.044 8.60458 177.248 8.40112 177.248 8.15483C177.248 7.90854 177.044 7.70508 176.798 7.70508ZM176.798 8.52962C176.605 8.52962 176.434 8.36899 176.434 8.15483C176.434 7.95137 176.594 7.78004 176.798 7.78004C176.991 7.78004 177.151 7.95137 177.151 8.15483C177.151 8.35829 176.991 8.52962 176.798 8.52962Z" fill="#231F20" />
                          <path d="M177.43 13.9238C177.43 13.9238 166.818 21.3008 147.421 24.6493H175.287C175.852 24.6493 176.394 24.426 176.796 24.0281C177.197 23.6301 177.424 23.0898 177.429 22.5248L177.455 19.2908L177.43 13.9238Z" fill="#F48120" />
                        </g>
                      </g>
                    </g>
                    <rect x="183.5" y="0.860352" width="38" height="24" rx="3" fill="black" />
                    <rect x="184" y="1.36035" width="37" height="23" rx="2.5" stroke="black" stroke-opacity="0.07" />
                    <path d="M198.735 14.8573V9.93235H199.715V14.8573H198.735ZM196.764 12.8829V11.9067H201.689V12.8829H196.764ZM203.203 14.6533V13.7426L206.427 8.65012H207.144V9.99063H206.689L204.383 13.6406V13.6989H208.802V14.6533H203.203ZM206.74 16.1104V14.3764L206.747 13.9612V8.65012H207.815V16.1104H206.74Z" fill="#DA9FC4" />
                    <defs>
                      <linearGradient id="paint0_linear_94_1128" x1="161" y1="13.1654" x2="158.832" y2="9.76982" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F89F20" />
                        <stop offset="0.25" stop-color="#F79A20" />
                        <stop offset="0.533" stop-color="#F68D20" />
                        <stop offset="0.62" stop-color="#F58720" />
                        <stop offset="0.723" stop-color="#F48120" />
                        <stop offset="1" stop-color="#F37521" />
                      </linearGradient>
                      <linearGradient id="paint1_linear_94_1128" x1="160.658" y1="13.1194" x2="157.489" y2="6.92355" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#F58720" />
                        <stop offset="0.359" stop-color="#E16F27" />
                        <stop offset="0.703" stop-color="#D4602C" />
                        <stop offset="0.982" stop-color="#D05B2E" />
                      </linearGradient>
                      <clipPath id="clip0_94_1128">
                        <rect width="40.69" height="25.7" fill="white" transform="translate(0.75 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip1_94_1128">
                        <rect width="40.69" height="25.7" fill="white" transform="translate(0.75 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip2_94_1128">
                        <rect width="40.6917" height="25.7" fill="white" transform="translate(0.749023 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip3_94_1128">
                        <rect width="40.69" height="25.7" fill="white" transform="translate(46.4399 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip4_94_1128">
                        <rect width="40.69" height="25.7" fill="white" transform="translate(46.4399 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip5_94_1128">
                        <rect width="40.6917" height="25.7" fill="white" transform="translate(46.439 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip6_94_1128">
                        <rect width="40.69" height="25.7" fill="white" transform="translate(92.1299 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip7_94_1128">
                        <rect width="40.69" height="25.7" fill="white" transform="translate(92.1299 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip8_94_1128">
                        <rect width="40.6917" height="25.7" fill="white" transform="translate(92.1289 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip9_94_1128">
                        <rect width="40.69" height="25.7" fill="white" transform="translate(137.81 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip10_94_1128">
                        <rect width="40.69" height="25.7" fill="white" transform="translate(137.81 0.0205078)" />
                      </clipPath>
                      <clipPath id="clip11_94_1128">
                        <rect width="40.6917" height="25.7" fill="white" transform="translate(137.809 0.0205078)" />
                      </clipPath>
                    </defs>
                  </svg>

                </span>
              </label>
              <div className="payment-inputs">
                <input autoComplete="cc-number" className="full-width" name="card-number" placeholder="Card number" type="text" />
                <input autoComplete="cc-exp" className="two-thirds-width" name="exp-date" placeholder="Expiration date (MM / YY)" type="text" />
                <input autoComplete="cc-csc" className="third-width" name="security-code" placeholder="Security code" type="text" />
                <input autoComplete="cc-name" className="full-width" name="card-name" placeholder="Name on card" type="text" />
              </div>
              <label className="checkbox-small" htmlFor="use-shipping-billing">
                <input id="use-shipping-billing" name="use-shipping-billing" type="checkbox" />
                Use shipping address as billing address
              </label>
              <div className="billing-address">
                <label>Billing address</label>
                <select id="billing-country" name="billing-country"><option>United States</option></select>
                <div className="delivery-row">
                  <input autoComplete="billing given-name" id="billing-first-name" name="billing-first-name" placeholder="First name" type="text" />
                  <input autoComplete="billing family-name" id="billing-last-name" name="billing-last-name" placeholder="Last name" type="text" />
                </div>
                <input autoComplete="billing address-line1" id="billing-address" name="billing-address" placeholder="Address" type="text" />
                <input autoComplete="billing address-line2" id="billing-apt" name="billing-apt" placeholder="Apartment, suite, etc. (optional)" type="text" />
                <div className="delivery-row">
                  <input autoComplete="billing address-level2" id="billing-city" name="billing-city" placeholder="City" type="text" />
                  <input autoComplete="billing address-level1" id="billing-state" name="billing-state" placeholder="State" type="text" />
                  <input autoComplete="billing postal-code" id="billing-zip" name="billing-zip" placeholder="ZIP code" type="text" />
                </div>
                <input autoComplete="billing tel" id="billing-phone" name="billing-phone" placeholder="Phone (optional)" type="tel" />
              </div>
              <div className="paypal-section">
                <label htmlFor="paypal-pay">
                  <input id="paypal-pay" name="payment" type="radio" value="paypal" />
                  PayPal
                </label>
                <img alt="PayPal logo" className="paypal-logo" height="20" src="./images/pay.svg" width="70" />
              </div>
              <div className="paypal-section">
                <label htmlFor="paypal-Apple">
                  <input id="paypal-Apple" name="payment" type="radio" value="paypal" />
                  <div className='info_pay'>
                    <img alt="PayPal logo" className="paypal-logo" height="20" src="./images/logopay.svg" width="70" />
                    <div>
                      | Pay in full or in installments
                    </div>
                  </div>
                </label>
              </div>
            </div>
            {/* Remember me */}
            <div className="remember-me">
              <label className='rememberTitle' htmlFor="remember-me-checkbox">
                REMEMBER ME
              </label>
              <div className="info-box">
                <label id="remember" name="payment" type="radio" value="remember" >
                  <input id="remember" type="radio" value="remember" name="remember" />
                  Save my information for a faster checkout with a Shop account
                </label>
                <input name="phone-number" placeholder="+1 Mobile phone number" type="text" />
              </div>
            </div>
            <div className='Secure'>
              Secure and encrypted
            </div>
            <button className="pay-now" type="button">PAY NOW</button>
            <div className="terms-text">
              Your info will be saved to a Shop account. By continuing, you agree to Shop's
              <a href="#"> Terms of Service </a> and acknowledge the <a href="#"> Privacy Policy </a>.
            </div>
          </div>
          {/* Right Side - Cart Summary */}
          <aside className="right cart-summary">
            {CART_ITEMS.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <img alt={item.name} src={item.image} width={50} height={50} />
                <div className="cart-item-info">
                  <strong>{item.name.toUpperCase()}</strong>
                  <small>{item.desc}</small>
                  <small>Cart note: {item.note}</small>
                </div>
                <div className="cart-item-price">{item.price}</div>
              </div>
            ))}
            <div className="discount-box">Don't miss out! Log in to earn and redeem rewards</div>
            <div className="discount-input">
              <input placeholder="Discount code or gift card" type="text" />
              <button type="button">Apply</button>
            </div>
            <div className="summary-row"><span>Subtotal 2 items</span><span>$70.00</span></div>
            <div className="summary-row"><span>Shipping</span><span>Enter shipping address</span></div>
            <div className="summary-total">TOTAL <strong>USD $70.00</strong></div>
          </aside>
        </div>
      </div>
      <footer>
        <a href="#">REFUND POLICY</a>
        <a href="#">SHIPPING POLICY</a>
        <a href="#">PRIVACY POLICY</a>
        <a href="#">TERMS OF SERVICE</a>
        <a href="#">CONTACT</a>
      </footer>
    </div>
  );
}