import { Page } from "./models/page.js";
import { HomePage } from "./pages/home.js";
import { ButtonToPage, PageTypes } from "./models/nav.js";
import { IPageManager, IPageManagerInternal } from "./models/page_manager.js";
import { Logger } from "./models/logger.js";
import { MatchPage } from "./pages/match.js";

/**
 * PageManager
 * 
 * Top level manager which owns the rendering and page navigation.
 */
export class PageManager extends Logger implements IPageManager, IPageManagerInternal {
  private readonly pages_: Map<PageTypes, Page>;
  private history_: PageTypes[] = [];
  private base_page_: PageTypes;

  constructor(pages: PageTypes[], base_page: PageTypes) {
    super();
    this.base_page_ = base_page;
    this.pages_ = new Map(pages.map(k => {
      return [k, this.createPageInstance(k)];
    }));
    this.registerButtons();
  }

  private createPageInstance(page: PageTypes): Page {
    switch (page) {
      case PageTypes.HOME:
        return new HomePage(this);
      case PageTypes.MATCH:
        return new MatchPage(this);
      default:
        throw new Error(`Unsupported PageType: ${page}`);
    }
  };

  async back() {
    // TODO: Implement true history.
    this.LOG('onBack');
    if (this.history_.length > 1) {
      await this.swapPage(this.history_[this.history_.length - 2]);
    } else {
      await this.swapPage(this.base_page_);
    }
  }

  private registerButtons() {
    ButtonToPage.forEach((page, button) => {
      if (this.pages_.has(page)) {
        $(`#${button}-button`).on('click', async () => {
          await this.swapPage(page);
        });
        this.LOG("Registered:", button, "=>", page);
      }
    });
  }

  async swapPage(target: PageTypes, context: any | undefined = undefined) {
    this.LOG('Swapping to:', target);
    const next = this.pages_.get(target);
    if (!next) {
      throw new Error(`Tried swapping to unknown page: ${target}`);
    }

    if (this.history_.length > 0) {
      const prev = this.history_[this.history_.length - 1];
      this.LOG('Swapping from:', prev);
      this.pages_.get(prev)!.onExit();
    }

    if (target === this.base_page_) {
      this.history_ = [];
    } else {
      this.history_.push(target);
    }

    await next.render(context);
  }
};
