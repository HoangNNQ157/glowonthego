import './Charm.scss';
import { useEffect, useState } from 'react';
import CharmService from '../services/charm.service';
import { Link } from 'react-router-dom';

const Charm = () => {
  // Sample data for small charms - remove this
  // const smallCharms = [
  //   { name: 'Bow Charm', image: '/images/charm__bow.png' },
  //   { name: 'Puffy Heart Charm', image: '/images/charm__heart.png' },
  //   { name: 'Puffy Paw Print Charm', image: '/images/charm__paw.png' },
  //   { name: 'Evil Eye Charm', image: '/images/charm__eye.png' },
  // ];

  const [charms, setCharms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await CharmService.getAllCharms();
        console.log("Fetched all charms:", response.data);

        // Lọc ra các charm có isActive = true và lấy 4 charm đầu tiên
        const activeCharms = (response.data || []).filter(charm => charm.isActive);
        const firstFourActiveCharms = activeCharms.slice(0, 4);

        setCharms(firstFourActiveCharms);
      } catch (error) {
        console.error("Error fetching charms:", error);
        setError(error.message || 'Failed to fetch charms');
        setCharms([]); // Ensure charms is an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCharms();
  }, []);


  return (
    <div className="charm">
      {/* Banner Section */}
      <div className="charm__banner">
        <img src="/images/charmhome.png" alt="Charm Banner" />
        <div className="charm__banner-overlay">
          <p>
            "The most charming thing about life is that it's<br />
            not the big events that shape our stories —<br />
            it's the little moments. Celebrate those. One<br />
            charm at a time."
          </p>
        </div>
      </div>

      {/* Charm Selection Section */}
      <section className="charm__selection">
        <div className="container charm__selection-container">
          <div className="charm__large-image">
            <img src="/images/charm__large.png" alt="Choose Your Charms" />
            <div className="charm__large-image-text">Choose Your Charms</div>
          </div>
          <div className="charm__small-charms">
            <div className="charm__small-charms-grid">
              {loading ? (
                <div>Loading charms...</div>
              ) : error ? (
                <div style={{ color: 'red' }}>{error}</div>
              ) : charms.length === 0 ? (
                <div>No charms available.</div>
              ) : (
                charms.map((charm) => (
                  <Link to={`/charm/${charm.id}`} key={charm.id} style={{ textDecoration: 'none' }}>
                    <div className="charm__small-charm-item">
                      <img src={charm.image} alt={charm.charmName} />
                      <p>{charm.charmName}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
            <Link to="/custom#custom__products-section">
              <button className="charm__shop-all-button">SHOP ALL CHARMS</button>
            </Link>
          </div>
        </div>
      </section>

      <div style={{ padding: '0 40px' }}>
        {/* Add Some Charm Section */}
        <section className="charm__add-charm">
          <div className="charm__add-charm-content">
            <h2>Add Some Charm</h2>
            <p>to customize your Glow™</p>
            {/* <button className="charm__add-charm-button">CUSTOMIZE</button> */}
          </div>
        </section>

        {/* Build Your Charm Story Section */}
        <section className="charm__build-story">
          <div className="charm__build-story-content">
            <h2>Build Your</h2>
            <h2>Charm Story</h2>
            {/* <button className="charm__build-story-button">BUILD YOURS HERE</button> */}
          </div>
        </section>
      </div>

    </div>
  );
};

export default Charm;