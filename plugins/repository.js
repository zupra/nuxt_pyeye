import createRepository from '~/api/repository.js'

export default (ctx, inject) => {
  const APIconstructor = createRepository(ctx.$axios)

  const repositories = {
    ftext: APIconstructor('ftext', 'core'),
    compile_texts: APIconstructor('compile_texts', 'core'),
    language: APIconstructor('language', 'core'),

    laboratory: APIconstructor('laboratory', 'core'),
    owner: APIconstructor('owner', 'core'),
    device: APIconstructor('device', 'core'),
    summary: APIconstructor('summary', 'core'),

    experiment: APIconstructor('experiment', 'core'),
    update_exp_stat: APIconstructor('update_exp_stat', 'core'),

    stimul: APIconstructor('stimul', 'core'),
    sausage: APIconstructor('sausage', 'core'),
    episode: APIconstructor('episode', 'core'),
    sausage_stimuls: APIconstructor('sausage_stimuls', 'core'),
    sausage_stimuls_pack: APIconstructor('sausage_stimuls_pack', 'core'),
    stimul_episodes: APIconstructor('stimul_episodes', 'core'),
    stimul_duplicate: APIconstructor('stimul_duplicate', 'core'),

    respondent: APIconstructor('respondent', 'core'),
    group: APIconstructor('group', 'core'),
    collect_groups: APIconstructor('collect_groups', 'core'),
    data: APIconstructor('data', 'core'),

    downloads: APIconstructor('downloads', 'core'),

    zone: APIconstructor('zone', 'core'),
    aggregate: APIconstructor('aggregate', 'core'),

    report: APIconstructor('report', 'core'),
    individual_reports: APIconstructor('zone_metric_calc', 'core'),

    form: APIconstructor('form', 'forms'),
    groupquestion: APIconstructor('groupquestion', 'forms'),
    question: APIconstructor('question', 'forms'),
    answers: APIconstructor('answers', 'forms'),
    form_resp: APIconstructor('form_resp', 'forms'),
    form_copy: APIconstructor('form_copy', 'forms'),
    answer_api: APIconstructor('answer_api', 'forms'),
    ext_answer_api: APIconstructor('ext_answer_api', 'forms'),
  }

  inject('API', repositories)
}
