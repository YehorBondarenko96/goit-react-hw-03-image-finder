import css from '../Styles.module.css';

export const ImageGalleryItem = ({webformatURL, id}) => {
    return(
        <li className={css.ImageGalleryItem}>
            <img className={css.ImageGalleryItemImage} src={webformatURL} alt={id} />
        </li>
    )
}