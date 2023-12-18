import css from '../Styles.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGellery = ({results}) => {
    return(
        <ul className={css.ImageGallery}>
            {results.map(result => <ImageGalleryItem key={result.id} {...result}/>)}
        </ul>
    )
}