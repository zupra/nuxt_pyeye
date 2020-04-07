import createRepository from '~/api/repository.js'

export default (ctx, inject) => {
  const APIconstructor = createRepository(ctx.$axios)

  const repositories = {
    ftext: APIconstructor('ftext', 'core'),
    compile_texts: APIconstructor('compile_texts', 'core'),
    language: APIconstructor('language', 'core'),
    laboratory: APIconstructor('laboratory', 'core'),

    device: APIconstructor('device', 'core'),
    summary: APIconstructor('summary', 'core'),
    experiment: APIconstructor('experiment', 'core'),
    update_exp_stat: APIconstructor('update_exp_stat', 'core'),
  }

  inject('API', repositories)
}
