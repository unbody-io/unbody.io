import {BlogPostAuthors} from "./BlogPostAuthors";
import styles from "./BlogPostHeader.module.css";

type Props=  {
    title: string;
    outline?: string;
    date: string;
    authors: {name: string, link: string, image?: string}[];
    type?: 'card' | 'page';
    image?: string;
}
export const BlogPostHeader = (props: Props) => {
    return (
        <div className={`${styles.header} ${styles[props.type]}`}>
            <div className={styles.heading}>
                <time>{props.date}</time>
                <span> | </span>
                <BlogPostAuthors authors={props.authors}/>
            </div>
            {
                props.type === 'card' ?
                    <h2>{props.title}</h2> :
                    <h1>{props.title}</h1>
            }
            {
                props.type !== 'card' && props.outline &&
                <p className={`${styles.outline}`}
                   dangerouslySetInnerHTML={{__html: props.outline}}
                />
            }
            {
                props.image &&
                <div className={styles.image}>
                    <img src={props.image} alt={props.title}/>
                </div>
            }
        </div>
    )
}
