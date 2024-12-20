import styles from '@styles/Sidebar.module.scss'

const Sidebar = ({ ...rest }) => {
	return (
		<div className={styles.sidebar} {...rest}>
			<div className={styles.title}>Sidebar</div>
		</div>
	)
}

export default Sidebar
