import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

import FileBase from 'react-file-base64';

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: '맑음' },
  { value: 1, label: '흐림' },
];

const Catogory = [
  { value: 0, label: '기분됴하' },
  { value: 0, label: '기분나뺘' },
  { value: 0, label: '내가..뭐라고했더라..?' },
  { value: 0, label: '깐부!' },
  { value: 0, label: '이러다 다 주겅~' },
];

function UploadPage(props) {
  const user = useSelector((state) => state.user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [weather, setWeather] = useState('맑음');
  const [categories, setCategories] = useState('Film & Animation');
  const [selectedFile, setSelectedFile] = useState('');

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeDecsription = (event) => {
    console.log(event.currentTarget.value);

    setDescription(event.currentTarget.value);
  };

  const handleChangeWeather = (event) => {
    setWeather(event.currentTarget.value);
  };

  const handleChangeCate = (event) => {
    setCategories(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      return alert('Please Log in First');
    }

    if (title === '' || description === '') {
      return alert('Please first fill all the fields');
    }

    const variables = {
      writer: user.userData._id,
      title: title,
      description: description,
      weather: weather,
      category: categories,
      selectedFile: selectedFile,
    };

    axios.post('/api/post/uploadPost', variables).then((response) => {
      console.log(response);
      if (response.data.success) {
        alert('Uploaded Successfully');
        // props.history.push('/')
        window.location.replace('/');
      } else {
        alert('Failed to upload');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}> Upload </Title>
      </div>

      <Form onSubmit={onSubmit}>
        <label>Title</label>
        <Input onChange={handleChangeTitle} value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={handleChangeDecsription}
          value={description}
          style={{ height: '150px' }}
        />
        <br />
        <br />

        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setSelectedFile(base64)}
        />

        <select onChange={handleChangeWeather}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <select onChange={handleChangeCate}>
          {Catogory.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadPage;
