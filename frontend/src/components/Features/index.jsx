import chatIcon from '../../assets/img/icon-chat.png';
              import moneyIcon from '../../assets/img/icon-money.png';
              import securityIcon from '../../assets/img/icon-security.png';
              import './Features.css';

              /**
               * Composant pour afficher les fonctionnalités de l'application.
               * @returns {JSX.Element} Le composant Features avec les différentes fonctionnalités et leurs descriptions.
               */
              const Features = () => (
                <section className="features">
                  <h2 className="sr-only">Features</h2>
                  <div className="feature-item">
                    <img src={chatIcon} alt="Chat Icon" className="feature-icon" loading="lazy" />
                    <h3 className="feature-item-title">You are our #1 priority</h3>
                    <p>
                      Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.
                    </p>
                  </div>
                  <div className="feature-item">
                    <img src={moneyIcon} alt="Money Icon" className="feature-icon" loading="lazy" />
                    <h3 className="feature-item-title">More savings means higher rates</h3>
                    <p>
                      The more you save with us, the higher your interest rate will be!
                    </p>
                  </div>
                  <div className="feature-item">
                    <img src={securityIcon} alt="Security Icon" className="feature-icon" loading="lazy" />
                    <h3 className="feature-item-title">Security you can trust</h3>
                    <p>
                      We use top of the line encryption to make sure your data and money is always safe.
                    </p>
                  </div>
                </section>
              );

              export default Features;