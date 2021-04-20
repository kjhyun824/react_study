import { AppLinkSource } from '../../constant/common_constant';
import { action, observable } from 'mobx';

class LinkStore {
  @observable private leader_token_: string = '';
  @observable private access_link_: string = '';
  @observable private link_source_: AppLinkSource = AppLinkSource.STANDALONE;

  constructor() {}

  @action.bound
  deinit() {
    this.setLeaderToken('');
    this.setAccessLink('');
  }

  get access_link() {
    return this.access_link_;
  }

  get leader_token() {
    return this.leader_token_;
  }

  get link_source() {
    return this.link_source_;
  }

  @action.bound
  setAccessLink(url: string) {
    this.access_link_ = url;
  }

  @action.bound
  setLeaderToken(token: string) {
    this.leader_token_ = token;
  }

  @action.bound
  setLinkSource(source: AppLinkSource) {
    this.link_source_ = source;
  }
}

export default LinkStore;
