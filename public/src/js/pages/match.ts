import { PageTypes, NavigationButtons } from "../models/nav.js";
import { IRenderData, Page } from "../models/page.js";
import { IPageManagerInternal } from "../models/page_manager.js";

interface IHomePageRenderData extends IRenderData, Object { };

export class MatchPage extends Page {
  protected readonly prefix_ = PageTypes.MATCH;
  protected readonly buttons_ = new Set<NavigationButtons>(Object.values(NavigationButtons));

  constructor(manager: IPageManagerInternal) {
    super(manager);
  }

  protected async onRender(_renderData: IHomePageRenderData) {
    console.log("match page has rendered")

  }
}
