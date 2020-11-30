import './skill.css'

const getLabel = (name) => {
  const LABELS = {
    php: 'PHP',
    js_js: 'Javascript/Typescript',
    matlab: 'Matlab',
    go: 'Go',
    ruby: 'Ruby',
    scala: 'Scala',
    java: 'Java',
    julia: 'Julia',
    d3js: 'D3',
    c_cplus: 'C/C++',
    r: 'R',
    sas_stata: 'SAS/STATA',
    vba: 'VBA',
    sql: 'SQL',
    other: 'Other',
    python: 'Python',
    bash: 'Bash',
    csharp_dotnet: 'C#/.NET',
  }
  return LABELS[name] || ''
}

function SkillItem({ name, value }) {
  return (
    <div className="skill">
      <h3 className="skill__title">{getLabel(name)}</h3>
      <div className="skill__level">
        <div
          className="levelbar proficiency_bar"
          style={{
            width: `${(value / 60) * 100}%`,
          }}
        />
        {/*{!-- <div className="levelbar interest_bar" style="width:{{skillLevel interest}};"></div> --}*/}
        <div className="levelbar indicator_bar" />
      </div>
    </div>
  )
}

function SkillsTable({ items, title, sorted }) {
  if (sorted === 'alpha') {
    items.sort((a, b) => {
      return a[0].localeCompare(b[0])
    })
  }

  return (
    <div>
      <section className="skill_section section">
        <div className="skill_container">
          <h3 className="section__title h3 mb-1">{title}</h3>
          <div className="skill-table">
            {items.map((item, index) => (
              <SkillItem key={index} name={item[0]} value={item[1]} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

SkillsTable.defaultProps = {
  sorted: false,
  title: 'Skills & Interests',
}

export { SkillsTable }
