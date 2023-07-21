import styles from '@styles/Sidebar.module.scss'

const Sidebar = ({ ...rest }) => {
	return (
		<div className={styles.sidebar} {...rest}>
			<div className={styles.title}>Nautilus Tracker</div>
		</div>
	)
}

export default Sidebar
