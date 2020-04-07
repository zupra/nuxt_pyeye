import APIconstructor from '~/util/base'

const language = new APIconstructor('language', 'core')
const laboratory = new APIconstructor('laboratory', 'core')
const owner = new APIconstructor('owner', 'core')
const device = new APIconstructor('device', 'core')
const summary = new APIconstructor('summary', 'core')

const experiment = new APIconstructor('experiment', 'core')
const update_exp_stat = new APIconstructor('update_exp_stat', 'core')

const stimul = new APIconstructor('stimul', 'core')
const sausage = new APIconstructor('sausage', 'core')
const episode = new APIconstructor('episode', 'core')
const sausage_stimuls = new APIconstructor('sausage_stimuls', 'core')
const sausage_stimuls_pack = new APIconstructor('sausage_stimuls_pack', 'core')
const stimul_episodes = new APIconstructor('stimul_episodes', 'core')
const stimul_duplicate = new APIconstructor('stimul_duplicate', 'core')

const respondent = new APIconstructor('respondent', 'core')
const group = new APIconstructor('group', 'core')
const collect_groups = new APIconstructor('collect_groups', 'core')
const data = new APIconstructor('data', 'core')

const downloads = new APIconstructor('downloads', 'core')

const zone = new APIconstructor('zone', 'core')
const aggregate = new APIconstructor('aggregate', 'core')

const report = new APIconstructor('report', 'core')
const individual_reports = new APIconstructor('zone_metric_calc', 'core')

// -
const form = new APIconstructor('form', 'forms')
const groupquestion = new APIconstructor('groupquestion', 'forms')
const question = new APIconstructor('question', 'forms')
const answers = new APIconstructor('answers', 'forms')
const form_resp = new APIconstructor('form_resp', 'forms')
const form_copy = new APIconstructor('form_copy', 'forms')
const answer_api = new APIconstructor('answer_api', 'forms')
const ext_answer_api = new APIconstructor('ext_answer_api', 'forms')

const API = {
  language,
  laboratory,
  owner,
  device,
  summary,

  experiment,
  update_exp_stat,

  respondent,

  stimul,
  sausage,
  episode,
  sausage_stimuls,
  sausage_stimuls_pack,
  stimul_episodes,
  stimul_duplicate,

  group,
  collect_groups,

  data,
  downloads,

  zone,
  aggregate,

  report,
  individual_reports,

  form,
  groupquestion,
  question,
  answers,
  form_resp,
  form_copy,
  answer_api,
  ext_answer_api,
}

export default API
