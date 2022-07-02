import {Formik,Form,Field} from 'formik'
import {useState} from 'react'
import './loading.css'
const App = () => {
  const [images,setImages] = useState([])
  const [loading,setLoading] = useState(false)
  const [found,setFound] = useState(true)
  const initial = {
    search:''
  }
  const getImages = async values =>{
    //call api unsplash
    setLoading(true)
    const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
      headers:{
        'Authorization':'Client-ID c-bc1MkvmzC7UATFltXpTjG4xZhReG9kWx7Bb8s6bPs'
      }
    })
    const data = await response.json()
    //const data = []
    //console.log(data.results)
    if(data.results.length > 0)
    {
      setFound(true)
      setImages(data.results)
    }
    else{
      setFound(false)
    }
    setLoading(false)
  }
  return (
    <div>
      <header>
        <div className='title'>IMAGES SEARCHER</div>
        <Formik
          initialValues={initial}
          onSubmit={getImages}
        >
          <Form className='form'>
            <Field className="input" name="search"></Field>
          </Form>
        </Formik>
      </header>
      <div className='container'>
        {
        loading ?
        <div className="spinner no-content">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
        :
          found 
          ?
            images.length > 0 ?
            <div className='center'>
              {images.map(image =>
              <article key={image.id} onClick={()=>(window.open(image.links.html))}>
                <img src={image.urls.regular}/>
                <p>{image.description != null ? image.description : image.alt_description}</p>
              </article>)}
            </div> 
            :
            <div className='no-content'>
              <span className='text-no-content'>SEARCH FOR SOMETHING</span>
            </div>
          :
            <div className='no-content'>
              <span className='text-no-content'>NO DATA FOUND</span>
            </div>
        }
        </div>
      </div>
  )
}

export default App