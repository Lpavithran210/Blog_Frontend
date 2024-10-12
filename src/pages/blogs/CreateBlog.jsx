import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiCall } from "../../utils/axios";
import { Alert, Box, Button, Chip, Grow, Snackbar, TextField, Typography } from '@mui/material';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [content, setContent] = useState('')
    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState('')
    const [banner, setBanner] = useState(null);
    const [snackbar, setSnackbar] = useState({})

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'align': [ ] }],
            ['blockquote'],
            ['link', 'image', 'video'],
        ]
      };
      
      const formats = [
        'header', 'font', 'size', 
        'bold', 'italic', 'underline', 'strike', 
        'color', 'background',
        'script', 'list', 'bullet', 
        'indent', 'align',
        'blockquote',
        'link', 'image', 'video'
      ];

    const handleFileChange = (e) => {
        setBanner(e.target.files[0]);
    };

    const handleSubmit = async () => {
        
        setSnackbar({open: false, type: '', message: ''});
        
        if(!title){
            return setSnackbar({open: true, type: 'error', message: 'Please enter title'});
        }
        if(!desc){
            return setSnackbar({open: true, type: 'error', message: 'Please enter short description'});
        }
        if(!content){
            return setSnackbar({open: true, type: 'error', message: 'Please enter blog content'});
        }
        if(tags.length < 1){
            return setSnackbar({open: true, type: 'error', message: 'Please add at least one tag'});
        }
        const formData = new FormData();
            formData.append('title', title);
            formData.append('desc', desc);
            formData.append('content', content);
            tags.forEach(tag => formData.append('tags', tag));
            if (banner) {
                formData.append('banner', banner);
            }
        try{
            const res = await apiCall("post", "/blog/create-post", formData)
            navigate('/')
        } catch(e) {
            return setSnackbar({open: true, type: 'error', message: e.response.data.message})
        }
    }
    const handleShortBio = (e) => {
        let newVal = e.target.value
        if(newVal.length <= 250){
            setDesc(newVal)
        }
    }
    const handleWriteTag = (e) => {
        let newTag = e.target.value
        if(newTag.length <= 15){
            setTagInput(e.target.value)
        } else {
            return setSnackbar({open: true, type: 'error', message: 'Cannot be more than 15 characters'})
        }
    }
    const handleTag = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            if(tagInput.trim()){
                setTags([...tags, tagInput.trim()])
                setTagInput('')
            }
        }
    }
    const handleTagRemove = (ind) => {
        const newTags = tags.filter((_, index) => index !== ind)
        setTags(newTags)
    }
    return (
        <>
            <Typography variant="h5" sx={{mb: 2, fontWeight: 600}}>Create Blog</Typography>
            <Typography variant="body2" sx={{mb:1}}>Banner</Typography>
            <input type="file" name='banner' accept="image/*" onChange={handleFileChange} />
            <TextField sx={{my:2}} size="small" fullWidth label='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <Box sx={{mb:2}}>
                <TextField multiline rows={2} size="small" fullWidth label='Short desc' value={desc} onChange={(e) => handleShortBio(e)}/>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt:'5px'}}>
                    <Typography variant="caption">{250 - (desc ? desc.length : 0)} {250 - (desc ? desc.length : 0) === 1 ? 'character': 'characters'} left</Typography>
                </Box>
            </Box>
            <Typography variant="body2" sx={{mb:1}}>Blog content</Typography>
            <ReactQuill
                value={content} 
                onChange={(value) => setContent(value)} 
                modules={modules} 
                formats={formats}
            />
            <TextField sx={{my:2}} size="small" fullWidth label='Tags' value={tagInput} onChange={(e) => handleWriteTag(e)} onKeyDown={handleTag}/>
            {tags.map((item, ind) => {
               return <Chip label={item} sx={{bgcolor: '#e9e9e9', minWidth: '50px', borderRadius: '20px', mr:2, mb:2}} onDelete={() => handleTagRemove(ind)} />
            })}
            <Button type="submit" variant="contained" onClick={handleSubmit} sx={{bgcolor: '#122620', display: 'block', textTransform: 'capitalize'}}>Create</Button>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={snackbar.open}
                autoHideDuration={2000}
                TransitionComponent={Grow}
                onClose={() => setSnackbar({open: false, type: '', message: ''})}
            >
            <Alert onClose={() => setSnackbar({open: false, type: '', message: ''})} severity={snackbar.type} sx={{ maxWidth: '500px', textAlign: 'left' }}>
                {snackbar.message}
            </Alert>
        </Snackbar>
        </>
    )
}

export default CreateBlog