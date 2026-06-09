import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { AuthGuard } from '../auth/auth.guard';
import type { CreateLeadDto } from './leads.service';

@Controller('api/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // Public endpoint for users registering on the website
  @Post()
  createLead(@Body() payload: CreateLeadDto) {
    return this.leadsService.create(payload);
  }

  // Protected admin endpoints
  @UseGuards(AuthGuard)
  @Get()
  getLeads(@Query('status') status?: string) {
    return this.leadsService.findAll(status);
  }

  @UseGuards(AuthGuard)
  @Get('stats')
  getLeadStats() {
    return this.leadsService.getStats();
  }

  @UseGuards(AuthGuard)
  @Patch(':id/status')
  updateLeadStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.leadsService.updateStatus(id, status);
  }
}
