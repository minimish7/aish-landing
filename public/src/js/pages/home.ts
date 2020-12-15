import { NavigationButtons, PageTypes } from "../models/nav.js";
import { IRenderData, Page } from "../models/page.js";
import { IPageManagerInternal } from "../models/page_manager.js";

interface IHomePageRenderData extends IRenderData, Object { };

export class HomePage extends Page {
  protected readonly buttons_ = new Set(Object.values(NavigationButtons));
  protected readonly prefix_ = PageTypes.HOME;

  constructor(manager: IPageManagerInternal) {
    super(manager);
  }

  protected async onRender(_renderData: IHomePageRenderData) {
    console.log("home page has rendered")
  }

};
