import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    release_year: '',
    rated: '',
    released: '',
    duration: '',
    genre: '',
    director: '',
    writer: '',
    actors: '',
    plot: '',
    language: '',
    country: '',
    awards: '',
    image_url: '',
    metascore: '',
    imdb_rating: '',
    imdb_votes: '',
    imdb_id: '',
    type: '',
    images: []
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files.map(file => URL.createObjectURL(file))
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        if (key !== 'images') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append image files
      formData.images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
      });

      const response = await axios.post('/api/movies', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiY29uc3VtZXIiLCJpYXQiOjE3MjQ3Nzk0NDUsImV4cCI6MTcyNDc4MzA0NX0.aRNf2HbdwNuWbDHzd7W4q4Afw-ighRlMFE7IWh2kC3Y'
        }
      });

      alert('Movie added successfully!');
      setFormData({
        title: '',
        release_year: '',
        rated: '',
        released: '',
        duration: '',
        genre: '',
        director: '',
        writer: '',
        actors: '',
        plot: '',
        language: '',
        country: '',
        awards: '',
        image_url: '',
        metascore: '',
        imdb_rating: '',
        imdb_votes: '',
        imdb_id: '',
        type: '',
        images: []
      });
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Error adding movie!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Add New Movie</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Release Year</Form.Label>
              <Form.Control type="text" name="release_year" value={formData.release_year} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Rated</Form.Label>
              <Form.Control type="text" name="rated" value={formData.rated} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Released</Form.Label>
              <Form.Control type="date" name="released" value={formData.released} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control type="text" name="duration" value={formData.duration} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Control type="text" name="genre" value={formData.genre} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Director</Form.Label>
              <Form.Control type="text" name="director" value={formData.director} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Writer</Form.Label>
              <Form.Control type="text" name="writer" value={formData.writer} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Actors</Form.Label>
          <Form.Control type="text" name="actors" value={formData.actors} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Plot</Form.Label>
          <Form.Control as="textarea" rows={3} name="plot" value={formData.plot} onChange={handleChange} />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Control type="text" name="language" value={formData.language} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Awards</Form.Label>
          <Form.Control type="text" name="awards" value={formData.awards} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Metascore</Form.Label>
              <Form.Control type="text" name="metascore" value={formData.metascore} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>IMDb Rating</Form.Label>
              <Form.Control type="text" name="imdb_rating" value={formData.imdb_rating} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>IMDb Votes</Form.Label>
              <Form.Control type="text" name="imdb_votes" value={formData.imdb_votes} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>IMDb ID</Form.Label>
              <Form.Control type="text" name="imdb_id" value={formData.imdb_id} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control type="file" multiple onChange={handleImageChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Movie
        </Button>
      </Form>
    </Container>
  );
};

export default MovieForm;