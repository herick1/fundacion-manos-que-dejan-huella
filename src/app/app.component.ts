import { Component,OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {SwPush, SwUpdate} from '@angular/service-worker';
import {NewsletterService} from './services/newsletter.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  readonly VAPID_PUBLIC_KEY = "BGpXrs5JMCp12-ZnyswX3fQyHttIdhwpy-BJGg8Uc-muLZORf82aPO1UBeRemcK_7thNFxIcDkjS3melYigx2wE"
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swPush: SwPush,
    private newsletterService: NewsletterService,
    private updates: SwUpdate,
    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.subscribeToNotifications()
  }
  
  ngOnInit() {
    this.actualizaciones();
  }

  async actualizaciones() {
    this.updates.available.subscribe(() => {
      // Keep the loading indicator active while we reload the page
      this.updateAvailable = true;
      window.location.reload();
    });
    if (this.updates.isEnabled) {
      // This promise will return when the update check is completed,
      // and if an update is available, it will also wait for the update
      // to be downloaded (at which point it calls our callback above and
      // we just need to reload the page to apply it).
      await this.updates.checkForUpdate();
    } else {
      console.log('Service worker updates are disabled.');
    }
    // The update check is done (or service workers are disabled), now
    // we can take the loading indicator down (unless we need to apply an
    // update, but in that case, we have already set this.updateAvailable
    // to true by this point, which keeps the loading indicator active).
    this.updateChecked = true;
  }

  updateChecked = false;
  updateAvailable = false;
  
  // In your template, use this value to show a loading indicator while we are
  // waiting for updates. (You can also use it to hide the rest of the UI if
  // you want to prevent the old version from being used.)
  get waitingForUpdates() {
    return !this.updateChecked || this.updateAvailable;
  }


  subscribeToNotifications() {
    if(this.newsletterService.usado==false){
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));
    }
  }



}
