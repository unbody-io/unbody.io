import styles from './styles.module.css'

type Props = {
    name: string
    title: string
    bio?: string
    image: string
    links: {name: string, href: string}[]
}
export const TeamMemberCard = (member: Props) => {
    return (
        <div className={styles.card}>
            <div className={styles.avatar}>
                <img src={member.image} alt={member.name}/>
            </div>
            <div className={styles.info}>
                <span className={styles.name}>{member.name}</span>
                <span className={styles.title}>{member.title}</span>
                {
                    member.bio &&
                    <p className={styles.bio}>{member.bio}</p>
                }
                <div className={styles.linkContainer}>
                    {member.links.map((link, i) => (
                        <>
                            <a href={link.href}
                               key={i}
                               className={`${styles.link} ${styles[link.name]}`}
                            >
                                {link.name}
                            </a>
                            {i !== member.links.length - 1 && <span className={styles.divider}>|</span>}
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
