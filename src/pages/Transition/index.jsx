import React from 'react'
import Header from '../../composants/Header'
import './TransitionCSS.css';
import Footer from '../../composants/Footer';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player';

const Transition = () => {
    return (
        <>
            <Header />
            <div className='imgTransition'>
                <div style={{ marginLeft: '5%', marginRight: '5%', display: 'flex', backgroundColor: 'white', padding: '10px', borderBottom: '3px solid red', height: '15%', width: '100%' }}>
                    <div style={{ marginRight: '5%', alignItems: 'center', flexDirection: 'column', width: '100%', padding: '30px', paddingTop: '5%' }}>
                        <span style={{ color: 'black', fontSize: '20px' }}><strong>Msr/Mme Votre inscription est terminer</strong></span> <br />
                        <span style={{ color: 'Red', fontSize: '40px', lineHeight: '28px' }}>BIENVENU AU PROGRAMME LEADERSHIP</span>
                    </div>
                    <div>
                        <img src="images/hero.png" alt="Hero" style={{ width: '100%', maxWidth: '374px', height: 'auto', }} />
                    </div>
                </div>

            </div>

            <div >
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div className="apropos-titre">
                                <h1 style={{ padding: '40px', textAlign: 'center' }}>Diriger vous vers votre tableau de bord</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <p style={{ fontSize: '18px', fontWeight: '400px', textAlign: 'center' }}>
                                Félicitations ! Vous vous êtes connecté avec succès.

                                Cliquez sur le bouton Ci-dessous pour commencer à explorer nos modules de formations, valides les cours et obtener votre certification.

                                Si vous avez besoin de plus d'information suivez la video.
                            </p>
                        </Col>

                        <div style={{ display: 'flex' }} className="video-button-container">
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"


                            />
                            <div style={{ display: "flex", justifyContent: "center", marginLeft: '20%', paddingTop: '10%' }}>
                                <a href="/dashboard" >
                                    <Button variant="danger">Accéder au tableau de bord</Button>
                                </a>
                            </div>
                        </div>


                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Transition