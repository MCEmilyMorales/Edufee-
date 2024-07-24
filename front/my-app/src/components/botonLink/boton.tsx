import React from 'react'
import Link from 'next/link'
import styles from './styles.module.css'

interface Props {
    link: string,
    text: string
    
}

const BotonLink = ({link, text}: Props) => {
  return (
    <li className={styles.btn}>
        <Link href={link}>{text}</Link>
    </li>
  )
}

export default BotonLink;