import React, {useState} from 'react'
import {Form} from 'antd'
import axios from 'axios'
import {useSelector} from 'react-redux'
import FileBase from 'react-file-base64'
import styled from 'styled-components'

const Div = styled.div`
    max-width: 700px;
    padding: 1rem;
    border-radius: 15px;
    /* box-shadow: 0 5px 80px 20px rgba(0, 0, 0, 0.3); */
    box-shadow: 10px 10px 10px 2px rgba(0, 0, 0.3, 0.3);
    background: #9e9075;
    margin-bottom: 2rem;
`
const SubmitButton = styled.button`
    border: 0;
    background: #4b4033;
    display: block;
    margin: 10px auto;
    text-align: center;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    cursor: pointer;
    transition: 0.25s;
    &:hover {
        background: #735f4d;
    }
`

const InputTitle = styled.input`
    border: 0;
    background: #735f4d;
    display: block;
    text-align: center;
    border: 3px solid #735f4d;
    padding: 4px 2px;
    width: 70%;
    outline: none;
    color: white;
    border-radius: 15px;
    transition: 0.25s;
    &:focus {
        width: 80%;
        border-color: #4b4033;
        background: white;
        color: black;
    }
`

const TextAreaDes = styled.textarea`
    border: 0;
    background: #735f4d;
    display: block;
    text-align: center;
    border: 3px solid #735f4d;
    padding: 4px 2px;
    width: 70%;
    height: 200px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    &:focus {
        width: 80%;
        border-color: #4b4033;
        background: white;
        color: black;
    }
`

const SelectW = styled.select`
    overflow: hidden;
    color: #bfbfbf;
    background: #735f4d;
    line-height: 20px;
    white-space: nowrap;
    text-align: left;
    text-overflow: ellipsis;
    width: 70%;
    text-align: 'center';
    border-radius: 20px;
    cursor: pointer;
`

const Private = [
    {value: '맑음'},
    {value: '구름조금'},
    {value: '구름많음'},
    {value: '흐림'},
    {value: '비'},
    {value: '소나기'},
    {value: '장마'},
    {value: '눈'},
    {value: '함박눈'},
    {value: '우박'},
    {value: '한파'},
    {value: '태풍'},
    {value: '천둥번개'},
]

const Catogory = [
    {value: '기쁨'},
    {value: '분노'},
    {value: '슬픔'},
    {value: '사랑'},
    {value: '감동'},
    {value: '즐거움'},
    {value: '그리움'},
    {value: '실망'},
    {value: '자신감'},
    {value: '짜증'},
    {value: '걱정'},
    {value: '설렘'},
]

function UploadPage(props) {
    const user = useSelector(state => state.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [weather, setWeather] = useState('맑음')
    const [category, setCategory] = useState('기쁨')
    const [selectedFile, setSelectedFile] = useState('')

    const handleChangeTitle = event => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = event => {
        setDescription(event.currentTarget.value)
    }

    const handleChangeWeather = event => {
        setWeather(event.currentTarget.value)
    }

    const handleChangeCate = event => {
        console.log(event.currentTarget.value)
        setCategory(event.currentTarget.value)
    }

    const onSubmit = event => {
        event.preventDefault()

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in First')
        }

        if (title === '' || description === '') {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: user.userData._id,
            title: title,
            description: description,
            weather: weather,
            category: category,
            selectedFile: selectedFile,
        }

        axios.post('/api/post/uploadPost', variables).then(response => {
            console.log(response)
            if (response.data.success) {
                alert('Uploaded Successfully')
                // props.history.push('/')
                window.location.replace('/home')
            } else {
                alert('Failed to upload')
            }
        })
    }

    return (
        <Div>
            <div style={{textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold'}}>
                <div> 일기 쓰기 </div>
            </div>

            <Form onSubmit={onSubmit} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <label>일기 제목</label>
                <InputTitle onChange={handleChangeTitle} value={title} />
                <br />
                <br />
                <label>일기 내용</label>
                <TextAreaDes onChange={handleChangeDecsription} value={description} />
                <br />
                <br />

                <SelectW placeholder="오늘의 날씨를 선택해주세요" onChange={handleChangeWeather}>
                    {Private.map((item, index) => (
                        <option key={index} value={item.value} style={{textAlign: 'center'}}>
                            {item.value}
                        </option>
                    ))}
                </SelectW>
                <br />

                <SelectW onChange={handleChangeCate}>
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.value} style={{textAlign: 'center'}}>
                            {item.value}
                        </option>
                    ))}
                </SelectW>
                <br />
                <div style={{width: '70%', color: 'white'}}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setSelectedFile(base64)} />
                </div>
                <br />

                <SubmitButton type="primary" size="large" onClick={onSubmit}>
                    일기 등록
                </SubmitButton>
            </Form>
        </Div>
    )
}

export default UploadPage
