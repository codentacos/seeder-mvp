/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ViewAppModal from '../ViewAppModal/ViewAppModal.jsx';
import style from './appCard.css';

const AppCard = (props) => {
  const { appData } = props;
  const { appData: { appDescription, appDev, appName, appLink, appLikes, _id } } = props;
  const { handleHearts } = props;
  const [description, setDescription] = useState(appDescription.length > 150 ? `${appDescription.slice(0, 150)}...` : appDescription);
  const [voted, setVoted] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDescription = () => {
    setDescription(description === appDescription ? `${appDescription.slice(0, 150)}...` : appDescription);
  };

  return (
    <Router>
      <Container className={style.appCard}>
        <Row>
          <Col xs={6}>
            <h2 className="mb-0">{appName}</h2>
          </Col>
          <Col xs={6} className="d-flex align-items-center justify-content-end">
            <Link to={`/app/${_id}`}><Button size="sm" className={`${style.button} mt-1`} onClick={handleShow}>App Profile</Button></Link>
          </Col>
        </Row>
        <Row>
          <Col className="mb-2">
            <span>
              <u>Developed by: {appDev}</u>
            </span>
          </Col>
        </Row>
        <Row>
          <p className={`ml-3 mr-3 mb-1 ${style.desc}`}>{`${description}`}</p>
          {description.length > 150 ? <span className={`ml-3 mb-2 ${style.seeMoreButton}`} onClick={handleDescription}>See More</span> : null}
        </Row>
        <Row>
          <Col>
            <div className={voted === false ? `${style.heart} d-inline-block` : `${style.heartFull} d-inline-block`} onClick={voted === false ? () => { handleHearts(_id); setVoted(true); } : null}><span className="ml-4">{appLikes}</span></div>
          </Col>
        </Row>
      </Container>
      <ViewAppModal
        appData={appData}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        setShow={setShow}
      />
    </Router>
  );
};

AppCard.propTypes = {
  handleHearts: PropTypes.func.isRequired,
  appData: PropTypes.shape({
    appName: PropTypes.string,
    appDescription: PropTypes.string,
    appDev: PropTypes.string,
    appLink: PropTypes.string,
    appLikes: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default AppCard;
