import wall from '../../assets/img/wall.avif'
import './Wallpaper.scss'

export const Wallpaper = () => {
  return (
    
    <>
        <div className={" wallpaper-container position-fixed d-flex top-0 bottom-0 end-0 start-0"}>
            <img className='wallpaper' src={wall} alt='Wallpaper'/>
        </div>
    </
    >
      
  
  );
};
 