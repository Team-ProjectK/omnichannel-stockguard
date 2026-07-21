import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService, AppTheme } from '../../core/services/theme.service';
import { Subscription } from 'rxjs';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  badge: string;
  color: string;
}

interface OverviewCard {
  icon: string;
  title: string;
  description: string;
  metric: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isDark = false;
  private themeSub!: Subscription;
  private savedThemeOnEntry: AppTheme = 'light';

  features: FeatureCard[] = [
    {
      icon: 'inventory_2',
      title: 'Inventory Management',
      description: 'Real-time multi-warehouse tracking, stock level progress monitoring, and automated safety buffers.',
      badge: 'Real-time',
      color: 'blue'
    },
    {
      icon: 'payments',
      title: 'Dynamic Pricing Engine',
      description: 'AI-driven dynamic price recommendations, elasticity modeling, and competitor pricing benchmarks.',
      badge: 'AI Powered',
      color: 'purple'
    },
    {
      icon: 'warehouse',
      title: 'Warehouse Management',
      description: 'Capacity utilization analytics, facility spatial tracking, and manager distribution node control.',
      badge: 'Multi-node',
      color: 'green'
    },
    {
      icon: 'local_shipping',
      title: 'Supplier Management',
      description: 'Vendor relationship management, performance rating systems, and automated supplier ordering.',
      badge: 'Vendor Hub',
      color: 'orange'
    },
    {
      icon: 'shopping_bag',
      title: 'Purchase Orders',
      description: 'Procurement workflows, pending approval status tracking, and expected delivery scheduling.',
      badge: 'Procurement',
      color: 'blue'
    },
    {
      icon: 'point_of_sale',
      title: 'Sales Orders',
      description: 'Omnichannel sales order processing, shipping status updates, and customer history logs.',
      badge: 'Omnichannel',
      color: 'green'
    },
    {
      icon: 'assessment',
      title: 'Reports & Analytics',
      description: 'Executive revenue breakdowns, category profit share charts, and instant PDF/Excel data export.',
      badge: 'Executive',
      color: 'purple'
    },
    {
      icon: 'psychology',
      title: 'AI Predictive Insights',
      description: 'Machine learning demand forecasting, intelligent risk alerts, and built-in AI assistant chat.',
      badge: 'Smart Engine',
      color: 'orange'
    }
  ];

  overviewItems: OverviewCard[] = [
    { icon: 'bolt', title: 'Real-time Inventory', description: 'Instant sync across all global distribution nodes with zero delay.', metric: '99.9% Sync Accuracy' },
    { icon: 'auto_awesome', title: 'AI Recommendations', description: 'Proactive stock reorder advice and margin optimization.', metric: '+14.2% Margin Gain' },
    { icon: 'trending_up', title: 'Pricing Intelligence', description: 'Algorithmic dynamic pricing tailored to demand elasticity.', metric: 'Automated Rules' },
    { icon: 'bar_chart', title: 'Business Analytics', description: 'Interactive visual dashboards with automated report generation.', metric: '360° Visibility' },
    { icon: 'domain', title: 'Warehouse Operations', description: 'Full facility capacity tracking and inventory re-balancing.', metric: 'Optimal Space' },
    { icon: 'description', title: 'Enterprise Reporting', description: 'Exportable CSV and PDF reports formatted for executive review.', metric: '1-Click Export' }
  ];

  constructor(
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.savedThemeOnEntry = this.themeService.currentTheme;

    // Landing Page supports Light & Dark themes only. Remove warm-theme while on welcome page.
    if (document.body.classList.contains('warm-theme')) {
      document.body.classList.remove('warm-theme');
    }

    this.themeSub = this.themeService.isDarkTheme().subscribe(dark => {
      this.isDark = dark;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSub) {
      this.themeSub.unsubscribe();
    }
    // Restore user theme when leaving landing page to app pages
    if (this.savedThemeOnEntry === 'warm') {
      document.body.classList.add('warm-theme');
    }
  }

  toggleTheme(): void {
    const nextDark = !this.isDark;
    this.isDark = nextDark;
    this.themeService.setDarkTheme(nextDark);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  scrollToSection(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
