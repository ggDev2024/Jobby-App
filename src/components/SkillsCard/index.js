import './index.css'

const SkillsCard = props => {
  const {skillsDetails} = props
  const {imageUrl, name} = skillsDetails

  return (
    <div className="skills_item_container">
      <img className="skills_image" src={imageUrl} alt={name} />
      <p>{name}</p>
    </div>
  )
}
export default SkillsCard
