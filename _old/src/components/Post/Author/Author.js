import React from 'react'
import styles from './Author.module.scss'
import { useSiteMetadata } from '../../../hooks'

const Author = () => {
  const { author } = useSiteMetadata()

  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>{author.name}</p>
    </div>
  )
}

export default Author
