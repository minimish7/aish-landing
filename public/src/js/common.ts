const { Mustache } = window;

export const SwapContent = (src: String, data?: Object) => {
  RenderTemplate(`${src}-content`, $('#content'), data);
  RenderTemplate(`${src}-menu-buttons`, $('#menu-buttons'));
};

export const RenderTemplate = (src: String, dst: JQuery<HTMLElement> | null, data?: Object) => {
  const template = $(`template#${src}`).html();
  const rendered = Mustache.render(template, data);
  if (!dst) {
    return $(rendered);
  }
  return dst.html(rendered);
};

export const AppendTemplate = (src: String, dst: String, data?: Object) => {
  const template = $(`template#${src}`).html();
  const rendered = Mustache.render(template, data);
  return $(dst).append(rendered);
};
